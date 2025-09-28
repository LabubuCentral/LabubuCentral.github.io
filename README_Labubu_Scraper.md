# 🎭 Labubu Image Scraper

A Python script to download Labubu product images from Google Images using the `icrawler` library.

## ✨ Features

- Download images from Google Images (or Bing)
- Customizable search queries for different Labubu products
- Configurable number of images to download
- Automatic folder creation
- Error handling and user-friendly messages
- Support for multiple Labubu product searches

## 📋 Requirements

- Python 3.x
- `icrawler` library (already installed)

## 🚀 Quick Start

1. **Run the script:**
   ```bash
   python labubu_scraper.py
   ```

2. **Images will be downloaded to:** `C:/Users/saisu/Pictures/Labubu`

3. **Current configuration downloads:** 15 images of "Labubu Forest Concert"

## ⚙️ Customization

### Option 1: Edit the script directly

Open `labubu_scraper.py` and modify these variables in the `main()` function:

```python
SEARCH_QUERY = "Your Labubu Product Name"  # Change search term
SAVE_FOLDER = "C:/Your/Custom/Path"        # Change save location
NUM_IMAGES = 20                           # Change number of images
SEARCH_ENGINE = "google"                  # Use "google" or "bing"
```

### Option 2: Create a config file

Create a `config.json` file to store your settings:

```json
{
  "search_query": "Labubu Forest Concert",
  "save_folder": "C:/Users/saisu/Pictures/Labubu",
  "num_images": 15,
  "search_engine": "google"
}
```

## 📝 Usage Examples

### Basic Usage
```python
from labubu_scraper import download_labubu_images

# Download 20 Labubu Forest Concert images
download_labubu_images(
    query="Labubu Forest Concert",
    folder="C:/Users/saisu/Pictures/Labubu",
    num_images=20
)
```

### Using Bing instead of Google
```python
download_labubu_images(
    query="Labubu Forest Concert",
    folder="C:/Users/saisu/Pictures/Labubu",
    num_images=15,
    engine="bing"
)
```

### Different Labubu Products
```python
# Labubu Checkmate
download_labubu_images("Labubu Checkmate", "C:/Images/Labubu", 10)

# Labubu Forest Concert
download_labubu_images("Labubu Forest Concert", "C:/Images/Labubu", 15)

# Labubu Macaron
download_labubu_images("Labubu Macaron", "C:/Images/Labubu", 12)
```

## 🔧 Troubleshooting

### If downloads fail:
1. **Try switching to Bing:**
   ```python
   download_labubu_images(query, folder, num_images, engine="bing")
   ```

2. **Check your internet connection**

3. **Ensure the save folder exists and is writable**

4. **Some sites may block scraping** - try different search terms

### Common Issues:
- **ImportError:** Make sure icrawler is installed (`pip install icrawler`)
- **Permission denied:** Check write permissions for the save folder
- **No images downloaded:** Try a different search query or switch to Bing

## 📁 File Structure

```
LabubuWebsite/
├── labubu_scraper.py      # Main scraper script
├── test_icrawler.py       # Test script for icrawler
└── README_Labubu_Scraper.md  # This file
```

## 🎯 Tips for Best Results

1. **Use specific search terms** like "Labubu Forest Concert" instead of just "Labubu"
2. **Start with smaller numbers** (10-20 images) for testing
3. **Switch to Bing** if Google Images is blocking requests
4. **Check image quality** - some downloaded images might be thumbnails
5. **Run multiple times** with different queries for comprehensive collections

## 📄 License

This script is provided as-is for personal use with Labubu products.
