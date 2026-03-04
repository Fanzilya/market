// src/data/products.js

const products = [
    // Grundfos
    {
      id: 'p1',
      brand: 'grundfos',
      name: 'Насос Grundfos SE1.50.80.40.4.52B',
      category: 'Погружные насосы',
      price: 125000,
      description: 'Погружной канализационный насос для перекачивания сточных вод с твердыми включениями. Высокая надежность и эффективность.',
      image: '🌊',
      specs: {
        power: '4 кВт',
        flow: '40 м³/ч',
        head: '15 м',
      }
    },
    {
      id: 'p2',
      brand: 'grundfos',
      name: 'Насос Grundfos TP 40-240/2',
      category: 'Циркуляционные насосы',
      price: 89000,
      description: 'Циркуляционный насос для систем отопления и охлаждения. Энергоэффективное решение с частотным регулированием.',
      image: '⚙️',
      specs: {
        power: '2.2 кВт',
        flow: '30 м³/ч',
        head: '12 м',
      }
    },
    {
      id: 'p3',
      brand: 'grundfos',
      name: 'Насосная станция Grundfos Hydro MPC',
      category: 'Насосные станции',
      price: 450000,
      description: 'Комплектная насосная станция для водоснабжения. Полная заводская готовность, интеллектуальное управление.',
      image: '🏭',
      specs: {
        power: '11 кВт',
        flow: '100 м³/ч',
        head: '60 м',
      }
    },
  
    // WILO
    {
      id: 'p4',
      brand: 'wilo',
      name: 'Насос Wilo-DrainLift XXL',
      category: 'Канализационные установки',
      price: 245000,
      description: 'Насосная станция для перекачивания сточных вод с крупными включениями. Надежная работа в сложных условиях.',
      image: '💧',
      specs: {
        power: '5.5 кВт',
        flow: '60 м³/ч',
        head: '18 м',
      }
    },
    {
      id: 'p5',
      brand: 'wilo',
      name: 'Насос Wilo-Star-Z 20/1-3',
      category: 'Циркуляционные насосы',
      price: 45000,
      description: 'Циркуляционный насос с мокрым ротором для систем отопления. Компактный и экономичный.',
      image: '🔄',
      specs: {
        power: '0.75 кВт',
        flow: '15 м³/ч',
        head: '6 м',
      }
    },
    {
      id: 'p6',
      brand: 'wilo',
      name: 'Насос Wilo-Helix V 1601',
      category: 'Многоступенчатые насосы',
      price: 185000,
      description: 'Высоконапорный многоступенчатый насос для водоснабжения и повышения давления.',
      image: '🔧',
      specs: {
        power: '7.5 кВт',
        flow: '25 м³/ч',
        head: '80 м',
      }
    },
  
    // Pedrollo
    {
      id: 'p7',
      brand: 'pedrollo',
      name: 'Насос Pedrollo F 40/200A',
      category: 'Центробежные насосы',
      price: 67000,
      description: 'Центробежный насос для промышленного применения. Коррозионностойкие материалы.',
      image: '🏗️',
      specs: {
        power: '3 кВт',
        flow: '25 м³/ч',
        head: '20 м',
      }
    },
    {
      id: 'p8',
      brand: 'pedrollo',
      name: 'Насос Pedrollo Top Vortex',
      category: 'Дренажные насосы',
      price: 32000,
      description: 'Дренажный насос для грязной воды с большими включениями. Прочный и надежный.',
      image: '🌀',
      specs: {
        power: '1.1 кВт',
        flow: '12 м³/ч',
        head: '8 м',
      }
    },
    {
      id: 'p9',
      brand: 'pedrollo',
      name: 'Насос Pedrollo HF 50',
      category: 'Поверхностные насосы',
      price: 28000,
      description: 'Самовсасывающий насос для водоснабжения из колодцев и скважин.',
      image: '💧',
      specs: {
        power: '1.5 кВт',
        flow: '8 м³/ч',
        head: '40 м',
      }
    },
  
    // КИТ
    {
      id: 'p10',
      brand: 'kit',
      name: 'КНС-10-15',
      category: 'Насосные станции',
      price: 450000,
      description: 'Канализационная насосная станция производительностью 10 м³/ч. Полная заводская готовность.',
      image: '🏭',
      specs: {
        power: '7.5 кВт',
        flow: '10 м³/ч',
        head: '15 м',
      }
    },
    {
      id: 'p11',
      brand: 'kit',
      name: 'Шкаф управления КНС',
      category: 'Автоматика',
      price: 89000,
      description: 'Шкаф управления для КНС с частотным преобразователем. Полная защита и автоматизация.',
      image: '📟',
      specs: {
        power: 'до 15 кВт',
        protection: 'IP54',
      }
    },
    {
      id: 'p12',
      brand: 'kit',
      name: 'Датчик уровня поплавковый',
      category: 'Комплектующие',
      price: 4500,
      description: 'Поплавковый датчик уровня для контроля включения насосов. Надежный и долговечный.',
      image: '🔌',
      specs: {
        length: '5 м',
        protection: 'IP68',
      }
    },
  
    // Ebara
    {
      id: 'p13',
      brand: 'ebara',
      name: 'Насос Ebara DWO 200',
      category: 'Погружные насосы',
      price: 156000,
      description: 'Погружной насос для дренажа и канализационных стоков. Японское качество и надежность.',
      image: '🌊',
      specs: {
        power: '4 кВт',
        flow: '35 м³/ч',
        head: '12 м',
      }
    },
    {
      id: 'p14',
      brand: 'ebara',
      name: 'Насос Ebara 3M 100/40',
      category: 'Центробежные насосы',
      price: 78000,
      description: 'Многоступенчатый насос для повышения давления в водопроводных системах.',
      image: '⚙️',
      specs: {
        power: '3 кВт',
        flow: '18 м³/ч',
        head: '50 м',
      }
    },
  
    // Calpeda
    {
      id: 'p15',
      brand: 'calpeda',
      name: 'Насос Calpeda NM 40/12E',
      category: 'Центробежные насосы',
      price: 45000,
      description: 'Нормированный центробежный насос для промышленных и сельскохозяйственных применений.',
      image: '🔧',
      specs: {
        power: '2.2 кВт',
        flow: '20 м³/ч',
        head: '15 м',
      }
    },
    {
      id: 'p16',
      brand: 'calpeda',
      name: 'Насос Calpeda MXH 205',
      category: 'Многоступенчатые насосы',
      price: 67000,
      description: 'Многоступенчатый насос из нержавеющей стали для водоснабжения.',
      image: '💧',
      specs: {
        power: '2.2 кВт',
        flow: '12 м³/ч',
        head: '45 м',
      }
    },
  
    // Джилекс
    {
      id: 'p17',
      brand: 'jileks',
      name: 'Насос Джилекс Водомет 115/115',
      category: 'Скважинные насосы',
      price: 15000,
      description: 'Скважинный насос для водоснабжения частного дома. Высокая производительность.',
      image: '🇷🇺',
      specs: {
        power: '1.5 кВт',
        flow: '5 м³/ч',
        head: '115 м',
      }
    },
    {
      id: 'p18',
      brand: 'jileks',
      name: 'Насосная станция Джилекс Джамбо',
      category: 'Насосные станции',
      price: 12000,
      description: 'Автоматическая насосная станция для водоснабжения дома и полива участка.',
      image: '🏠',
      specs: {
        power: '0.9 кВт',
        flow: '4 м³/ч',
        head: '40 м',
      }
    },
  
    // DAB
    {
      id: 'p19',
      brand: 'dab',
      name: 'Насос DAB FEKA VS 600',
      category: 'Дренажные насосы',
      price: 35000,
      description: 'Дренажный насос с режущим механизмом для перекачки стоков с крупными включениями.',
      image: '⚡',
      specs: {
        power: '1.5 кВт',
        flow: '18 м³/ч',
        head: '9 м',
      }
    },
    {
      id: 'p20',
      brand: 'dab',
      name: 'Насос DAB K 80/500',
      category: 'Циркуляционные насосы',
      price: 28000,
      description: 'Циркуляционный насос для систем отопления и горячего водоснабжения.',
      image: '🔄',
      specs: {
        power: '0.8 кВт',
        flow: '12 м³/ч',
        head: '5 м',
      }
    },
  
    // Lowara
    {
      id: 'p21',
      brand: 'lowara',
      name: 'Насос Lowara e-SH 4/8',
      category: 'Скважинные насосы',
      price: 42000,
      description: 'Скважинный насос из нержавеющей стали для водоснабжения. Высокая надежность.',
      image: '🌍',
      specs: {
        power: '1.1 кВт',
        flow: '4 м³/ч',
        head: '65 м',
      }
    },
    {
      id: 'p22',
      brand: 'lowara',
      name: 'Насос Lowara e-SV 8/6',
      category: 'Многоступенчатые насосы',
      price: 89000,
      description: 'Вертикальный многоступенчатый насос для промышленного водоснабжения.',
      image: '🔧',
      specs: {
        power: '3 кВт',
        flow: '8 м³/ч',
        head: '55 м',
      }
    },
  ]
  
  export const getProductsByBrand = (brandSlug) => {
    return products.filter(p => p.brand === brandSlug)
  }
  
  export const getProductById = (id) => {
    return products.find(p => p.id === id) || null
  }
  
  export const getAllProducts = () => {
    return products
  }
  
  export const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category)
  }
  
  export const getCategories = () => {
    return [...new Set(products.map(p => p.category))]
  }