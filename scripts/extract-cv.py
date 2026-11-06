"""Extract a CV locally. Legacy .doc requires Word on Windows (extract-cv.ps1)."""
import argparse
from pathlib import Path
import zipfile
import xml.etree.ElementTree as ET

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('input', type=Path)
parser.add_argument('--output', type=Path, default=Path('.cv-work/current.txt'))
args = parser.parse_args()
suffix = args.input.suffix.lower()
if suffix == '.docx':
    with zipfile.ZipFile(args.input) as z:
        root = ET.fromstring(z.read('word/document.xml'))
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    text = '\n'.join(''.join(p.itertext()) for p in root.findall('.//w:p', ns))
elif suffix == '.pdf':
    from pypdf import PdfReader
    text = '\n'.join(page.extract_text() or '' for page in PdfReader(args.input).pages)
elif suffix in ('.txt', '.md'):
    text = args.input.read_text(encoding='utf-8-sig')
else:
    parser.error('Use .txt, .md, .docx or a text PDF. For .doc use scripts/extract-cv.ps1 with Microsoft Word.')
text = text.replace('\r', '\n').replace('\x0b', '\n').replace('\x0c', '\n').replace('\x01', '')
if len(text.strip()) < 100:
    parser.error('Not enough text. A scanned PDF needs OCR before import.')
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(text, encoding='utf-8')
print(f'Extracted {len(text)} characters to {args.output}. Review before AI processing.')
