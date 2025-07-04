from flask import Blueprint, request, Response
import requests
import mammoth
from bs4 import BeautifulSoup
import re

docx_viewer = Blueprint("docx_viewer", __name__)

def extract_doc_id(doc_url):
    try:
        return doc_url.split("/d/")[1].split("/")[0]
    except Exception:
        return None

@docx_viewer.route("/view_docx", methods=["POST"])
def view_docx():
    """
    Expects a .docx file upload as form-data with key 'file'.
    Returns a themed HTML page with the docx content (text, images, LaTeX).
    """
    if "file" not in request.files:
        return "No file uploaded", 400

    file = request.files["file"]
    docx_bytes = file.read()

    # Convert docx to HTML (images as base64)
    result = mammoth.convert_to_html(
        docx_bytes,
        convert_image=mammoth.images.inline(
            lambda image: image.read("base64").then(
                lambda data: {"src": f"data:{image.content_type};base64,{data}"}
            )
        ),
    )
    html_content = result.value

    soup = BeautifulSoup(html_content, "html.parser")

    # Handle italics
    style_block = soup.find("style")
    italic_classes = set()
    equation_classes = set()
    if style_block:
        matches = re.findall(r'\.([a-zA-Z0-9_\- ]+)\s*\{[^}]*font-style\s*:\s*italic', style_block.text)
        for match in matches:
            for cls in match.split():
                italic_classes.add(cls)
        eq_matches = re.findall(
            r'\.([a-zA-Z0-9_\- ]+)\s*\{[^}]*font-family\s*:\s*["\']?(Cambria Math|EB Garamond)["\']?', 
            style_block.text, 
            re.IGNORECASE
        )
        for match in eq_matches:
            for cls in match[0].split():
                equation_classes.add(cls)

    for span in soup.find_all("span"):
        style = span.get("style", "")
        span_classes = span.get("class", [])
        if "italic" in style.lower() or any(cls in italic_classes for cls in span_classes):
            em_tag = soup.new_tag("em")
            em_tag.extend(span.contents)
            span.replace_with(em_tag)

    # Equations as MathJax
    """
    for span in soup.find_all("span"):
        span_classes = span.get("class", [])
        if any(cls in equation_classes for cls in span_classes):
            img = span.find("img")
            if img and img.has_attr("alt"):
                alt_text = img["alt"].strip()
                if alt_text.startswith("$") and alt_text.endswith("$"):
                    mathjax_span = soup.new_tag("span", **{"class": "mathjax"})
                    mathjax_span.string = alt_text
                    span.replace_with(mathjax_span)

    html_content = str(soup)"""

    # Themed HTML template
    themed_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>DOCX Preview</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Oswald:wght@400;700&display=swap');
            body {{
                background: #0a0a0a;
                color: #f8f8f8;
                font-family: 'Inter', 'JetBrains Mono', 'Oswald', Arial, sans-serif;
                margin: 0;
                padding: 0;
                min-height: 100vh;
            }}
            .docx-content {{
                max-width: 900px;
                margin: 48px auto;
                background: #181c24;
                padding: 40px 36px;
                border-radius: 18px;
                box-shadow: 0 4px 32px #ff404022, 0 0 0 2px #ff4040;
                border: 1.5px solid #ff4040;
            }}
            h1, h2, h3, h4, h5, h6 {{
                color: #ff4040;
                font-family: 'Oswald', 'Inter', Arial, sans-serif;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
            }}
            a {{
                color: #ff3333;
                text-decoration: underline;
                font-weight: 600;
            }}
            a:hover {{
                color: #ffb3b3;
            }}
            img {{
                max-width: 100%;
                border-radius: 8px;
                margin: 18px 0;
                background: #23283a;
                box-shadow: 0 2px 12px #ff404022;
            }}
            .mathjax {{
                color: #ff4040;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                font-size: 1.08em;
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

@docx_viewer.route("/view_gdoc", methods=["GET"])
def view_gdoc():
    """
    Usage: /docx/view_gdoc?url=<google_doc_url>
    Returns a themed HTML page with the Google Doc content.
    """
    doc_url = request.args.get("url")
    if not doc_url:
        return "Missing 'url' parameter", 400

    doc_id = extract_doc_id(doc_url)
    if not doc_id:
        return "Invalid Google Docs URL", 400

    export_url = f"https://docs.google.com/document/d/{doc_id}/export?format=html"
    resp = requests.get(export_url)
    if resp.status_code != 200:
        return "Failed to fetch Google Doc. Make sure it is public.", 400

    soup = BeautifulSoup(resp.text, "html.parser")

    for img in soup.find_all("img"):
        src = img.get("src", "")
        if src.startswith("cid:") or not src:
            img.replace_with(soup.new_string("[Image not available]"))
        elif src.startswith("/"):
            img["src"] = f"https://docs.google.com{src}"

    # --- Attempt to wrap LaTeX-like text for MathJax ---
    """
    def wrap_latex(text):
        text = re.sub(r'(\$\$.*?\$\$)', r'<span class="mathjax">\1</span>', text)
        text = re.sub(r'(\$[^\$]+\$)', r'<span class="mathjax">\1</span>', text)
        return text

    for el in soup.find_all(text=True):
        if "$" in el:
            el.replace_with(wrap_latex(el))"""

    style_block = soup.find("style")
    italic_classes = set()
    equation_classes = set()
    if style_block:
        matches = re.findall(r'\.([a-zA-Z0-9_\- ]+)\s*\{[^}]*font-style\s*:\s*italic', style_block.text)
        for match in matches:
            for cls in match.split():
                italic_classes.add(cls)
        eq_matches = re.findall(
            r'\.([a-zA-Z0-9_\- ]+)\s*\{[^}]*font-family\s*:\s*["\']?(Cambria Math|EB Garamond)["\']?', 
            style_block.text, 
            re.IGNORECASE
        )
        for match in eq_matches:
            for cls in match[0].split():
                equation_classes.add(cls)

    for span in soup.find_all("span"):
        style = span.get("style", "")
        span_classes = span.get("class", [])
        if "italic" in style.lower() or any(cls in italic_classes for cls in span_classes):
            em_tag = soup.new_tag("em")
            em_tag.extend(span.contents)
            span.replace_with(em_tag)

    """for span in soup.find_all("span"):
        span_classes = span.get("class", [])
        if any(cls in equation_classes for cls in span_classes):
            img = span.find("img")
            if img and img.has_attr("alt"):
                alt_text = img["alt"].strip()
                if alt_text.startswith("$") and alt_text.endswith("$"):
                    mathjax_span = soup.new_tag("span", **{"class": "mathjax"})
                    mathjax_span.string = alt_text
                    span.replace_with(mathjax_span)"""

    body_content = soup.body.decode_contents()

    themed_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>Google Doc Preview</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Oswald:wght@400;700&display=swap');
            body {{
                background: #0a0a0a;
                color: #f8f8f8;
                font-family: 'Inter', 'JetBrains Mono', 'Oswald', Arial, sans-serif;
                margin: 0;
                padding: 0;
                min-height: 100vh;
            }}
            .docx-content {{
                max-width: 900px;
                margin: 48px auto;
                background: #181c24;
                padding: 40px 36px;
                border-radius: 18px;
                box-shadow: 0 4px 32px #ff404022, 0 0 0 2px #ff4040;
                border: 1.5px solid #ff4040;
            }}
            h1, h2, h3, h4, h5, h6 {{
                color: #ff4040;
                font-family: 'Oswald', 'Inter', Arial, sans-serif;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
            }}
            a {{
                color: #ff3333;
                text-decoration: underline;
                font-weight: 600;
            }}
            a:hover {{
                color: #ffb3b3;
            }}
            img {{
                max-width: 100%;
                border-radius: 8px;
                margin: 18px 0;
                background: #23283a;
                box-shadow: 0 2px 12px #ff404022;
            }}
            .mathjax {{
                color: #ff4040;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                font-size: 1.08em;
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
        </style>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </head>
    <body>
        <div class="docx-content">
            {body_content}
        </div>
    </body>
    </html>
    """
    return Response(themed_html, mimetype="text/html")