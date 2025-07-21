from flask import Blueprint, request, Response
import requests
import tempfile
import subprocess

docx_viewer = Blueprint("docx_viewer", __name__)

@docx_viewer.route("/view_docx", methods=["GET"])
def view_docx_embedded():
    """
    Usage: /docx/view_docx_embedded?url=<direct_docx_file_url>
    Returns a themed HTML page with the DOCX content, with all images embedded as base64 and equations as LaTeX (MathJax).
    """
    docx_url = request.args.get("url")
    if not docx_url:
        return "Missing 'url' parameter", 400

    # Download the .docx file
    resp = requests.get(docx_url)
    if resp.status_code != 200:
        return "Failed to fetch DOCX file.", 400

    docx_bytes = resp.content

    # Use Pandoc to convert to HTML with images embedded as base64
    with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as tmp_docx:
        tmp_docx.write(docx_bytes)
        tmp_docx.flush()
        tmp_html = tempfile.NamedTemporaryFile(suffix=".html", delete=False)
        tmp_html.close()

        subprocess.run([
            "pandoc",
            tmp_docx.name,
            "-o", tmp_html.name,
            "--mathjax",
            "--self-contained"
        ], check=True)

        with open(tmp_html.name, "r", encoding="utf-8") as f:
            html_content = f.read()

    themed_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset=\"utf-8\"/>
        <title>DOCX Preview</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Oswald:wght@400;700&display=swap');
            body {{
                margin: 0 !important;
                padding-top: 0 !important;
                padding-bottom: 0 !important;
                padding-right: 0 !important;
                background: #181c24;
                color: #f8f8f8;
                font-family: 'Inter', 'JetBrains Mono', 'Oswald', Arial, sans-serif;
                width: 100vw;
                min-width: 100vw;
            }}
            .docx-content {{
                width: 100vw;
                max-width: 100vw;
                margin: 0;
                background: #181c24;
                padding: 40px 16px 40px 16px;
                border: none;
                box-shadow: none;
                border-radius: 0;
                box-sizing: border-box;
                overflow-x: auto;
            }}
            .docx-content * {{
                margin-left: 0 !important;
                padding-left: 0 !important;
                text-align: left !important;
            }}
            .docx-content ul,
            .docx-content ol {{
                margin-left: 2em !important;
                padding-left: 2em !important;
                list-style-position: outside !important;
            }}
            .docx-content ul {{
                list-style-type: disc !important;
            }}
            .docx-content ol {{
                list-style-type: decimal !important;
            }}
            .docx-content table {{
                width: 100% !important;
                table-layout: auto !important;
                display: block;
                overflow-x: auto;
                word-break: break-word;
            }}
            .docx-content th, .docx-content td {{
                word-break: break-word;
                white-space: normal;
            }}
            .docx-content img {{
                max-width: 100% !important;
                height: auto !important;
                display: block;
            }}
            .docx-content pre, .docx-content code {{
                white-space: pre-wrap !important;
                word-break: break-word !important;
            }}
            h1, h2, h3, h4, h5, h6 {{
                color: #ff4040;
                font-family: 'Oswald', 'Inter', Arial, sans-serif;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
            }}
            a {{
                color: #ff4040 !important;
                text-decoration: underline !important;
                font-weight: bold !important;
            }}
            a:visited {{
                color: #ffb3b3 !important;
                text-decoration: underline !important;
                font-weight: bold !important;
            }}
            a:hover {{
                color: #ffb3b3 !important;
            }}
            em, i {{
                font-style: italic !important;
                color: #ffb3b3;
            }}
            strong, b {{
                color: #ff4040;
                font-weight: 700;
            }}
            p, li, td, th {{
                font-size: 1.13rem;
                line-height: 1.7;
                letter-spacing: 0.01em;
            }}
            ul, ol {{
                padding-left: 2em;
            }}
            code, pre {{
                background: #23283a;
                color: #ff4040;
                border-radius: 6px;
                padding: 2px 6px;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                font-size: 1em;
            }}
            table {{
                border-collapse: collapse;
                width: 100%;
                margin: 1.5em 0;
                background: #23283a;
                color: #f8f8f8;
                border-radius: 8px;
                overflow: hidden;
            }}
            th, td {{
                border: 1px solid #ff404044;
                padding: 10px 14px;
            }}
            th {{
                background: #1c0008;
                color: #ff6666;
                font-family: 'JetBrains Mono', monospace;
                font-weight: 600;
            }}
            tr:nth-child(even) {{
                background: #23283a;
            }}
            tr:nth-child(odd) {{
                background: #181c24;
            }}
            blockquote {{
                border-left: 4px solid #ff4040;
                background: #23283a;
                color: #ffb3b3;
                margin: 1.5em 0;
                padding: 1em 1.5em;
                border-radius: 8px;
                font-style: italic;
            }}
            mjx-container[jax="CHTML"][display="false"] {{
                background: none !important;
                border: none !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin: 0 !important;
                border-radius: 0 !important;
                display: inline !important;
                vertical-align: middle !important;
            }}
            mjx-container[jax="CHTML"] {{
                color: #ff4040;
            }}
            /* Responsive styles */
            @media (max-width: 900px) {{
                .docx-content {{
                    padding: 24px 8px 24px 8px;
                }}
                p, li, td, th {{
                    font-size: 1rem;
                }}
                th, td {{
                    padding: 8px 6px;
                }}
            }}
            @media (max-width: 600px) {{
                .docx-content {{
                    padding: 12px 2vw 12px 2vw;
                }}
                h1, h2, h3, h4, h5, h6 {{
                    font-size: 1.1em;
                }}
                p, li, td, th {{
                    font-size: 0.98rem;
                }}
                th, td {{
                    padding: 6px 2px;
                }}
                table, .docx-content table {{
                    font-size: 0.95em;
                }}
            }}
        </style>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </head>
    <body>
        <div class="docx-content">
            {html_content}
        </div>
    </body>
    </html>
    """
    return Response(themed_html, mimetype="text/html")

