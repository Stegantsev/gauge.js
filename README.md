# gauge.js
========

 * Никаких картинок, или CSS - только canvas
 * Гибкая система настроек
 * Доступно и понятно стилизуем 
 * Любые значения в пределах 10,000
 * Устанавливается через bower
 * Цветовых участков шкалы

## Использование

```javascript
var g = Gauge({
	id: "canvas",		// ID элемента для установки прибора
	width: 400,			// Размер
	name: "Tachometer", // Имя прибора
	index: "RPM x1000", // Единицы измерения
	scaleInside: false,	// Шкала внесена внутрь
	maxValue: 6,		// Максимальное значение	
	colors: {				// Цвета:
		background: '#000',	// — задника
		texts: '#fff',		// — цифр, букв и разметки
		hands: '#f00',		// — стрелки		
		base: '#02fefe',	// — шкалы
		warning: '#02aeee',	// — стремной зоны
		danger: '#f00'		// — опасной зоны
	},
	scaleRange: {			
		warning: 4.5,		// начало стремной зоны
		danger: 5.5			// начало опасной зоны
	},
	value: 3				// текущее значение
});
g.setValue(5); // Установить значение в единицах
g.set(0.25); // Установить значение в долях единицы
```

Для демонстрации возможностей посетите http://stegantsev.github.io/gauge.js
