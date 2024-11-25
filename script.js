//CREATE MAP  
  const map = L.map('map', {
    center: [20,0],
    zoom: 2.4,
    worldCopyJump: false
  });
   L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
    { attribution: '&copy; CARTO', 
    noWrap: true
    }).addTo(map);

// GET COUNTRY DATA
  fetch('countries.geojson')
  .then(response => response.json())
  .then(data => {

    // Default country styling (without Strongyloides)
    const defaultStyle = () => ({
      color: "#000000", // Border color
      weight: 0.3,       // Border thickness
      fillColor: "#CDE7FF", // Fill color
      fillOpacity: 0
    });

    // Add countries to the map
    const geojsonLayer = L.geoJSON(data, {
      style: defaultStyle,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);

      // Add interactivity for clicks
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
        });
      }
    }).addTo(map);

// PARASITES LIST

// STRONGYLOIDES
    // Assign Colour
    const getColorForStrongyloides = (parasites) => {
      return parasites.includes("Strongyloides stercoralis") ? "#004702" : "#fafafa";
    };

    // Define Layer Style
    const styleByStrongyloides = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForStrongyloides(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    };

    // Create Link
    const StrongyLink = L.control({ position: 'bottomleft' });
    StrongyLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/strongyloidiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Strongyloidiasis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerStrongyloides = L.geoJSON(data, {
      style: styleByStrongyloides,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
        });
      }
    }).on('add', () => {
      StrongyLink.addTo(map); 
    }).on('remove', () => {
      map.removeControl(StrongyLink);
    }) 

  
//ASCARIS
    // Asign Colour
    const getColorForAscaris = (parasites) => {
      return parasites.includes("Ascaris lumbricoides") ? "#004702" : "#fafafa";
    };

    // Define Layer Style
    const styleByAscaris = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForAscaris(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    };

    // Create Link
    const AscarisLink = L.control({ position: 'bottomleft' });
    AscarisLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/ascariasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Ascariasis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerAscaris = L.geoJSON(data, {
      style: styleByAscaris,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
      });
    }}).on('add', () => {
      AscarisLink.addTo(map); 
    }).on('remove', () => {
      map.removeControl(AscarisLink);
    }) 

//DRACUNCULUS
    // Assign colours
    const getColorForDrac = (parasites) => {
        if (parasites.includes("Dracunculus medinensis")) {return "#004702";}
        return "#fafafa"; // Default
    };

    // Define Layer Style
    const styleByDrac = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForDrac(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    }

    // Create Link
    const DracLink = L.control({ position: 'bottomleft' });
    DracLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/dracunculiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Dracunculiasis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerDrac = L.geoJSON(data, {
    style: styleByDrac,
    onEachFeature: (feature, layer) => {
    const countryName = feature.properties.ADMIN || "Unknown Country";
    const parasites = feature.properties.endemicParasites || [];
    const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
    layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
    layer.on('click', () => {
      const details = `<h3>${countryName}</h3>
        <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
      layer.bindPopup(details).openPopup();
    });

    }}).on('add', () => {
      DracLink.addTo(map); 
    }).on('remove', () => {
      map.removeControl(DracLink);
    }); 

//SHISTO
    // Assign colours
    const getColorForSchisto = (parasites) => {
      if (parasites.includes("Schistosoma mansoni") && parasites.includes("Schistosoma haematobium")) {return "#027d2d"}
      if (parasites.includes("Schistosoma mekongi")) {return "#ff3842";}
      if (parasites.includes("Schistosoma haematobium")) {return "#c28e00";}
      if (parasites.includes("Schistosoma mansoni")) {return "#0010a3";}
      if (parasites.includes("Schistosoma japonicum")) {return "#460f5c";} 
      return "#fafafa"; // Default
  };

  // Define Layer Style
  const styleBySchisto = (feature) => {
    const parasites = feature.properties.endemicParasites || [];
    return {
      fillColor: getColorForSchisto(parasites),
      weight: 0.5,
      color: '#000000',
      fillOpacity: 0.3
    };
  }
  // Create Link
    const SchistoLink = L.control({ position: 'bottomleft' });
    SchistoLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/schistosomiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Schistosomiasis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };
  
  // Add Legend
  const schistoLegend = L.control({ position: 'bottomright' });
  schistoLegend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const schistoColors = [
      { species: "Schistosoma mansoni", color: "#0010a3" },
      { species: "Schistosoma haematobium", color: "#c28e00" },
      { species: "S. mansoni & S. haematobium", color: "#027d2d" },
      { species: "Schistosoma mekongi", color: "#ff3842" },
      { species: "Schistosoma japonicum", color: "#460f5c" }
  ];
  div.innerHTML = '<h3>Schistosoma Species</h3>';
  schistoColors.forEach(entry => {
      div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
      div.style.border = "2px solid black"; 
      div.style.backgroundColor = 'white';  
      div.style.padding = '10px';  
      div.style.borderRadius = '5px';  
      div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    });
  return div;
  };

  // Create Layer
  const geojsonLayerSchisto = L.geoJSON(data, {
  style: styleBySchisto,
  onEachFeature: (feature, layer) => {
  const countryName = feature.properties.ADMIN || "Unknown Country";
  const parasites = feature.properties.endemicParasites || [];
  const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
  layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
  layer.on('click', () => {
    const details = `<h3>${countryName}</h3>
      <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
    layer.bindPopup(details).openPopup();
  });
  }})
  .on('add', () => {
  schistoLegend.addTo(map); 
  }).on('remove', () => {
  map.removeControl(schistoLegend);
  }).on('add', () => {
    SchistoLink.addTo(map); 
  }).on('remove', () => {
    map.removeControl(SchistoLink);
  }) 

//LYMPHATIC FILARIASIS
    // Assign colours
    const getColorForLF = (parasites) => {
      if (parasites.includes("Brugia malayi") && parasites.includes("Wuchereria bancrofti")) {return "#027d2d"}
      if (parasites.includes("Wuchereria bancrofti")) {return "#c28e00";}
      if (parasites.includes("Brugia malayi")) {return "#0010a3";}
      if (parasites.includes("Brugia timori")) {return "#0010a3";}
      return "#fafafa"; // Default
  };

  // Define Layer Style
  const styleByLF = (feature) => {
    const parasites = feature.properties.endemicParasites || [];
    return {
      fillColor: getColorForLF(parasites),
      weight: 0.5,
      color: '#000000',
      fillOpacity: 0.3
    };
  }

  // Add Legend
  const LFLegend = L.control({ position: 'bottomright' });
  LFLegend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const LFColors = [
      { species: "Brugia spp.", color: "#0010a3" },
      { species: "Wuchereria bancrofti", color: "#c28e00" },
      { species: "Brugia spp. & W. bancrofti", color: "#027d2d" }
  ];
  div.innerHTML = '<h3>Causes of Lymphatic Filariasis</h3>';
  LFColors.forEach(entry => {
      div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
      div.style.border = "2px solid black"; 
      div.style.backgroundColor = 'white';  
      div.style.padding = '10px';  
      div.style.borderRadius = '5px';  
      div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
  });
  return div;
  };

  // Create Link
  const LFLink = L.control({ position: 'bottomleft' });
  LFLink.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info link');
  div.innerHTML = '<a href="https://www.cdc.gov/dpdx/lymphaticfilariasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Lymphatic Filariasis</a>';
  div.style.border = "2px solid black"; 
  div.style.backgroundColor = 'white';  
  div.style.padding = '10px';  
  div.style.borderRadius = '5px';  
  div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
  return div;
  };

  // Create Layer
  const geojsonLayerLF = L.geoJSON(data, {
  style: styleByLF,
  onEachFeature: (feature, layer) => {
  const countryName = feature.properties.ADMIN || "Unknown Country";
  const parasites = feature.properties.endemicParasites || [];
  const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
      
  layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
  layer.on('click', () => {
    const details = `<h3>${countryName}</h3>
      <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
    layer.bindPopup(details).openPopup();
  });

  }}).on('add', () => {
  LFLegend.addTo(map); 
  }).on('remove', () => {
  map.removeControl(LFLegend);
  }).on('add', () => {
    LFLink.addTo(map); 
  }).on('remove', () => {
    map.removeControl(LFLink);
  }); 

//ONCHOCERCA
    // Asign Colour
    const getColorForRB = (parasites) => {
      return parasites.includes("Onchocerca volvulus") ? "#004702" : "#fafafa";
    };

    // Define Layer Style
    const styleByRB = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForRB(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    };

    // Create Link
    const RBLink = L.control({ position: 'bottomleft' });
    RBLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/onchocerciasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Onchocerciasis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerRB = L.geoJSON(data, {
      style: styleByRB,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
      });
    }}).on('add', () => {
      RBLink.addTo(map); 
    }).on('remove', () => {
      map.removeControl(RBLink);
    }); 

//LOA LOA
    // Asign Colour
    const getColorForLoa = (parasites) => {
      return parasites.includes("Loa loa") ? "#004702" : "#fafafa";
    };

    // Define Layer Style
    const styleByLoa = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForLoa(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    };

    // Create Link
    const LoaLink = L.control({ position: 'bottomleft' });
    LoaLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/loiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Loaiasis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerLoa = L.geoJSON(data, {
      style: styleByLoa,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
      });
    }}).on('add', () => {
      LoaLink.addTo(map); 
    }).on('remove', () => {
      map.removeControl(LoaLink);
    }); 

//ECHINOCOCCUS
    // Assign colours
    const getColorForEchino = (parasites) => {
      if (parasites.includes("Echinococcus multilocularis") && parasites.includes("Echinococcus granulosus")) {return "#027d2d"}
      if (parasites.includes("Echinococcus multilocularis")) {return "#c28e00";}
      if (parasites.includes("Echinococcus granulosus")) {return "#0010a3";}
      return "#fafafa"; // Default
  };

    // Define Layer Style
    const styleByEchino = (feature) => {
    const parasites = feature.properties.endemicParasites || [];
    return {
      fillColor: getColorForEchino(parasites),
      weight: 0.5,
      color: '#000000',
      fillOpacity: 0.3
    };
  }

    // Add Legend
   const EchinoLegend = L.control({ position: 'bottomright' });
    EchinoLegend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const EchinoColors = [
      { species: "Echinococcus granulosus", color: "#0010a3" },
      { species: "Echinococcus multilocularis", color: "#c28e00" },
      { species: "Both E. granulosus & E. multilocularis", color: "#027d2d" }
  ];
    div.innerHTML = '<h3>Echinococcus Species</h3>';
    EchinoColors.forEach(entry => {
      div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
      div.style.border = "2px solid black"; 
      div.style.backgroundColor = 'white';  
      div.style.padding = '10px';  
      div.style.borderRadius = '5px';  
      div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
  });
     return div;
  };

    // Create Link
    const EchinoLink = L.control({ position: 'bottomleft' });
    EchinoLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/echinococcosis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Echinococcosis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerEchino = L.geoJSON(data, {
    style: styleByEchino,
   onEachFeature: (feature, layer) => {
    const countryName = feature.properties.ADMIN || "Unknown Country";
    const parasites = feature.properties.endemicParasites || [];
    const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
      
    layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
    layer.on('click', () => {
    const details = `<h3>${countryName}</h3>
      <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
    layer.bindPopup(details).openPopup();
  });

  }}).on('add', () => {
    EchinoLegend.addTo(map); 
  }).on('remove', () => {
    map.removeControl(EchinoLegend);
  }).on('add', () => {
    EchinoLink.addTo(map); 
  }).on('remove', () => {
    map.removeControl(EchinoLink);
  }) 

//INTESTINAL FLUKES
    // Assign colours
    const getColorForIF = (parasites) => {
      if (parasites.includes("Metagonimus yokogawai") && parasites.includes("Fasciolopsis buski") && parasites.includes("Heterophyes heterophyes")) {return "#011c08"}
      if (parasites.includes("Fasciolopsis buski") && parasites.includes("Heterophyes heterophyes")) {return "#027d2d"}
      if (parasites.includes("Metagonimus yokogawai") && parasites.includes("Heterophyes heterophyes")) {return "#FE730A"}
      if (parasites.includes("Metagonimus yokogawai") && parasites.includes("Fasciolopsis buski")) {return "#D10AFE"}
      if (parasites.includes("Heterophyes heterophyes")) {return "#c28e00";}
      if (parasites.includes("Fasciolopsis buski")) {return "#0010a3";}
      if (parasites.includes("Metagonimus yokogawai")) {return "#D30000";}
      return "#fafafa"; // Default
  };

    // Define Layer Style
    const styleByIF = (feature) => {
    const parasites = feature.properties.endemicParasites || [];
    return {
      fillColor: getColorForIF(parasites),
      weight: 0.5,
      color: '#000000',
      fillOpacity: 0.3
    };
  }

    // Add Legend
   const IFLegend = L.control({ position: 'bottomright' });
    IFLegend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const IFColors = [
      { species: "Fasciolopsis buski", color: "#0010a3" },
      { species: "Heterophyes heterophyes", color: "#c28e00" },
      { species: "Metagonimus yokogawai", color: "#D30000" },
      { species: "Both F. buski & H. heterophyes", color: "#027d2d" },
      { species: "Both F. buski & M. yokogawai", color: "#D10AFE" },
      { species: "Both H. heterophyes & M. yokogawai", color: "#FE730A" },
      { species: "F. buski, H. heterophyes & M. yokogawai", color: "#011c08" }

  ];
    div.innerHTML = '<h3>Intestinal Flukes</h3>';
    IFColors.forEach(entry => {
      div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
      div.style.border = "2px solid black"; 
      div.style.backgroundColor = 'white';  
      div.style.padding = '10px';  
      div.style.borderRadius = '5px';  
      div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
  });
     return div;
  };

    // Create Link
    const IFLink = L.control({ position: 'bottomleft' });
    IFLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = `
        <a href="https://www.cdc.gov/dpdx/fasciolopsiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none; display: block;">CDC DPDx: Fasciolopsiasis</a>
        <a href="https://www.cdc.gov/dpdx/heterophyiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none; display: block;">CDC DPDx: Heterophyiasis</a>
        <a href="https://www.cdc.gov/dpdx/metagonimiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none; display: block;">CDC DPDx: Metagonimiasis</a>
    `;
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerIF = L.geoJSON(data, {
    style: styleByIF,
   onEachFeature: (feature, layer) => {
    const countryName = feature.properties.ADMIN || "Unknown Country";
    const parasites = feature.properties.endemicParasites || [];
    const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
      
    layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
    layer.on('click', () => {
    const details = `<h3>${countryName}</h3>
      <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
    layer.bindPopup(details).openPopup();
  });

  }}).on('add', () => {
    IFLegend.addTo(map); 
  }).on('remove', () => {
    map.removeControl(IFLegend);
  }).on('add', () => {
    IFLink.addTo(map); 
  }).on('remove', () => {
    map.removeControl(IFLink);
  });

//OTHER LIVER FLUKES
    // Assign colours
    const getColorForLiver = (parasites) => {
      if (parasites.includes("Clonorchis sinensis") && parasites.includes("Opisthorchis viverrini")) {return "#027d2d"}
      if (parasites.includes("Clonorchis sinensis")) {return "#c28e00";}
      if (parasites.includes("Opisthorchis viverrini") || parasites.includes("Opisthorchis felineus")) {return "#0010a3";}
      return "#fafafa"; // Default
  };

    // Define Layer Style
    const styleByLiver = (feature) => {
    const parasites = feature.properties.endemicParasites || [];
    return {
      fillColor: getColorForLiver(parasites),
      weight: 0.5,
      color: '#000000',
      fillOpacity: 0.3
    };
  }

    // Add Legend
   const LiverLegend = L.control({ position: 'bottomright' });
    LiverLegend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const LiverColors = [
      { species: "Clonorchis sinensis", color: "#c28e00" },
      { species: "Opisthorchis spp.", color: "#0010a3" },
      { species: "Both C. sinensis & O. viverrini", color: "#027d2d" }
  ];
    div.innerHTML = '<h3>Liver Flukes</h3>';
    LiverColors.forEach(entry => {
      div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
      div.style.border = "2px solid black"; 
      div.style.backgroundColor = 'white';  
      div.style.padding = '10px';  
      div.style.borderRadius = '5px';  
      div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
  });
     return div;
  };

    // Create Link
    const LiverLink = L.control({ position: 'bottomleft' });
    LiverLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = `
    <a href="https://www.cdc.gov/dpdx/clonorchiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none; display: block;">CDC DPDx: Clonorchiasis</a>
    <a href="https://www.cdc.gov/dpdx/opisthorchiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none; display: block;">CDC DPDx: Opisthorchiasis</a>
    `;
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerLiver = L.geoJSON(data, {
    style: styleByLiver,
   onEachFeature: (feature, layer) => {
    const countryName = feature.properties.ADMIN || "Unknown Country";
    const parasites = feature.properties.endemicParasites || [];
    const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
      
    layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
    layer.on('click', () => {
    const details = `<h3>${countryName}</h3>
      <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
    layer.bindPopup(details).openPopup();
  });

  }}).on('add', () => {
    LiverLegend.addTo(map); 
  }).on('remove', () => {
    map.removeControl(LiverLegend);
  }).on('add', () => {
    LiverLink.addTo(map); 
  }).on('remove', () => {
    map.removeControl(LiverLink);
  });

//FASCIOLA
    // Assign colours
    const getColorForFasc = (parasites) => {
      if (parasites.includes("Fasciola hepatica") && parasites.includes("Fasciola gigantica")) {return "#027d2d"}
      if (parasites.includes("Fasciola gigantica")) {return "#c28e00";}
      if (parasites.includes("Fasciola hepatica")) {return "#0010a3";}
      return "#fafafa"; // Default
  };

    // Define Layer Style
    const styleByFasc = (feature) => {
    const parasites = feature.properties.endemicParasites || [];
    return {
      fillColor: getColorForFasc(parasites),
      weight: 0.5,
      color: '#000000',
      fillOpacity: 0.3
    };
  }

    // Add Legend
   const FascLegend = L.control({ position: 'bottomright' });
    FascLegend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const FascColors = [
      { species: "Fasciola gigantica", color: "#c28e00" },
      { species: "Fasciola hepatica", color: "#0010a3" },
      { species: "Both F. gigantica & F. hepatica", color: "#027d2d" }
  ];
    div.innerHTML = '<h3>Fasciola Species</h3>';
    FascColors.forEach(entry => {
      div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
      div.style.border = "2px solid black"; 
      div.style.backgroundColor = 'white';  
      div.style.padding = '10px';  
      div.style.borderRadius = '5px';  
      div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
  });
     return div;
  };

    // Create Link
    const FascLink = L.control({ position: 'bottomleft' });
    FascLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/fascioliasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Fascioliasis</a>';
    div.style.border = "2px solid black"; 
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerFasc = L.geoJSON(data, {
    style: styleByFasc,
   onEachFeature: (feature, layer) => {
    const countryName = feature.properties.ADMIN || "Unknown Country";
    const parasites = feature.properties.endemicParasites || [];
    const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
      
    layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
    layer.on('click', () => {
    const details = `<h3>${countryName}</h3>
      <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
    layer.bindPopup(details).openPopup();
  });

  }}).on('add', () => {
    FascLegend.addTo(map); 
  }).on('remove', () => {
    map.removeControl(FascLegend);
  }).on('add', () => {
    FascLink.addTo(map); 
  }).on('remove', () => {
    map.removeControl(FascLink);
  }); 

//PARAGONIMUS
    // Asign Colour
    const getColorForPara = (parasites) => {
      return parasites.includes("Paragonimus spp.") ? "#004702" : "#fafafa";
    };

    // Define Layer Style
    const styleByPara = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForPara(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    };
    // Create Link
    const ParaLink = L.control({ position: 'bottomleft' });
    ParaLink.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info link');
    div.innerHTML = '<a href="https://www.cdc.gov/dpdx/paragonimiasis/index.html" target="_blank" style="color: black; font-size: 18px; text-decoration: none;">CDC DPDx: Paragonimiasis</a>';
    div.style.backgroundColor = 'white';  
    div.style.padding = '10px';  
    div.style.borderRadius = '5px';  
    div.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; 
    return div;
    };

    // Create Layer
    const geojsonLayerPara = L.geoJSON(data, {
      style: styleByPara,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
      });
    }}).on('add', () => {
      ParaLink.addTo(map); 
    }).on('remove', () => {
      map.removeControl(ParaLink);
    }); 
   
// LAYER CONTROL
    L.control.layers({
      "Default": geojsonLayer,
      "Ascarias": geojsonLayerAscaris,
      "Dracunculus": geojsonLayerDrac,
      "Echinococcus": geojsonLayerEchino,
      "Fasciola": geojsonLayerFasc,
      "Loa Loa": geojsonLayerLoa,
      "Lymphatic Filariasis": geojsonLayerLF,      
      "Onchocerca": geojsonLayerRB,
      "Paragonimus": geojsonLayerPara,
      "Schistosoma": geojsonLayerSchisto,
      "Strongyloides": geojsonLayerStrongyloides,
      "Intestinal Flukes": geojsonLayerIF,
      "Liver Flukes": geojsonLayerLiver
    }).addTo(map);

})

.catch(error => console.error('Error loading GeoJSON:', error));