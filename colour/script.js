document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color');
    const addColorBtn = document.getElementById('add-color');
    const clearColorBtn = document.getElementById('clear-colors');
    const colorPapers = document.querySelector('.color-papers');
    const colorInfo = document.getElementById('color-info');
    const hexInfo = document.getElementById('hex-info');
    const rgbInfo = document.getElementById('rgb-info');
    const showColorBtn = document.getElementById('show-color');
    const knowMoreBtn = document.getElementById('know-more');
  
    addColorBtn.addEventListener('click', () => {
      const colorValue = colorPicker.value;
      createColorPaper(colorValue);
      displayColorInfo(colorValue);
    });
  
    clearColorBtn.addEventListener('click', () => {
      clearAllColors();
    });
  
    colorPapers.addEventListener('click', (event) => {
      if (event.target.classList.contains('color-paper')) {
        const hexValue = event.target.style.backgroundColor;
        getColorInfo(hexValue);
      }
    });
  
    showColorBtn.addEventListener('click', () => {
      const hexValue = document.getElementById('hex-input').value.trim();
      if (isValidHex(hexValue)) {
        createColorPaper(hexValue);
        displayColorInfo(hexValue);
      } else {
        alert('Please enter a valid HEX code.');
      }
    });
  
    knowMoreBtn.addEventListener('click', () => {
      const hexValue = colorPicker.value;
      getColorInfo(hexValue);
    });
  
    function createColorPaper(color) {
      const colorPaper = document.createElement('div');
      colorPaper.classList.add('color-paper');
      colorPaper.style.backgroundColor = color;
      colorPapers.appendChild(colorPaper);
    }
  
    function displayColorInfo(color) {
      const hex = color.toUpperCase();
      const rgb = hexToRgb(color);
      hexInfo.textContent = `Hex: ${hex}`;
      rgbInfo.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
      colorInfo.classList.remove('hidden');
    }
  
    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return { r, g, b };
    }
  
    function clearAllColors() {
      colorPapers.innerHTML = '';
      colorInfo.classList.add('hidden');
      hexInfo.textContent = '';
      rgbInfo.textContent = '';
    }
  
    function getColorInfo(hex) {
      const colorName = getColorName(hex);
      if (colorName) {
        openWikiPage(colorName);
      } else {
        alert('Color information not found.');
      }
    }
  
    function getColorName(hex) {
      return 'List_of_colors_(compact)';
    }
  
    function openWikiPage(colorName) {
      const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(colorName)}`;
      window.open(wikiUrl, '_blank');
    }
  
    function isValidHex(hex) {
      return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
    }
  });
  