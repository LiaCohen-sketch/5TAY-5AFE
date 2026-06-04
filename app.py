from flask import Flask, render_template, send_from_directory, request, jsonify
import os
import sys



app = Flask(__name__)

ROOT = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(ROOT, "model.onnx")



_inference_session = None

_inference_error = None





def _load_inference_session():

    global _inference_session, _inference_error

    if _inference_session is not None:

        return _inference_session

    if _inference_error is not None:

        raise RuntimeError(_inference_error)



    try:

        import onnxruntime as ort

    except ImportError as exc:
        _inference_error = (
            "onnxruntime could not load. Install with Python 3.12 (not 3.14): "
            "py -3.12 -m pip install -r requirements.txt — then start the app with: "
            "py -3.12 app.py (or double-click run.bat)."
        )
        raise RuntimeError(_inference_error) from exc
    except Exception as exc:
        _inference_error = f"onnxruntime failed to load: {exc}"
        raise RuntimeError(_inference_error) from exc



    session_options = ort.SessionOptions()

    try:

        from onnxruntime_extensions import get_library_path



        session_options.register_custom_ops_library(get_library_path())

    except ImportError:

        pass



    try:

        _inference_session = ort.InferenceSession(

            MODEL_PATH,

            session_options,

            providers=["CPUExecutionProvider"],

        )

    except Exception as exc:

        _inference_error = f"Could not load model.onnx: {exc}"

        raise RuntimeError(_inference_error) from exc



    return _inference_session





def _predict_urls(urls):

    session = _load_inference_session()

    label, probabilities = session.run(None, {"inputs": urls})

    results = []

    for index, url in enumerate(urls):

        proba = float(probabilities[index][1])

        results.append(

            {

                "url": url,

                "label": int(label[index]),

                "phishing_probability": proba,

                "phishing_percent": round(proba * 100, 2),

            }

        )

    return results





@app.route("/")

def index():

    return render_template("index.html")





@app.route("/api/history")

def URLhisrtory():

    return render_template("history.html")





@app.route("/api/learnMore")

def URLlearnMore():

    return render_template("learnMore.html")





@app.route("/api/CheckURL")

def URLCheckURL():

    return render_template("CheckURL.html")





@app.route("/model.onnx")

def model_onnx():

    return send_from_directory(ROOT, "model.onnx")





@app.route("/api/predict", methods=["POST"])

def predict():

    payload = request.get_json(silent=True) or {}

    url = (payload.get("url") or "").strip()

    urls = payload.get("urls")



    if urls is not None:

        if not isinstance(urls, list) or not urls:

            return jsonify({"error": "urls must be a non-empty list"}), 400

        urls = [str(item).strip() for item in urls if str(item).strip()]

    elif url:

        urls = [url]

    else:

        return jsonify({"error": "Provide url or urls in the request body"}), 400



    if not urls:

        return jsonify({"error": "No valid URLs to check"}), 400



    try:

        return jsonify({"results": _predict_urls(urls)})

    except RuntimeError as exc:

        return jsonify({"error": str(exc)}), 503

    except Exception as exc:

        return jsonify({"error": f"Inference failed: {exc}"}), 500





if __name__ == "__main__":
    if sys.version_info >= (3, 14):
        print(
            "Warning: Python 3.14 cannot run the ONNX model. "
            "Use: py -3.12 app.py  or  run.bat"
        )
    app.run(debug=True)

