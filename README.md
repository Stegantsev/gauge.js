# gauge.js

 * Никаких картинок, спрайтов или CSS - только canvas
 * Никаких зависимостей. Jquery поддерживается, но совершенно не нужен
 * Гибкая система настроек
 * Любые значения шкалы в пределах до 10,000
 * Доступно и понятно стилизуем через настройки
 * Устанавливается через bower. Должен )

## Использование

```javascript
var g = Gauge({
	id: "canvas",		// ID элемента для установки прибора
	width: 400,		// Размер
	name: "Вольтметр", 	// Имя прибора
	index: "кВ", 		// Единицы измерения
	scaleInside: false,	// Шкала внесена внутрь
	maxValue: 6,		// Максимальное значение	
	colors: {			// Цвета:
		background: '#000',	// — задника
		texts: '#fff',		// — цифр, букв и разметки
		hands: '#f00',		// — стрелки		
		base: '#02fefe',	// — шкалы
		warning: '#02aeee',	// — стремной зоны
		danger: '#f00'		// — опасной зоны
	},
	scaleRange: {			
		warning: 4.5,	// начало стремной зоны
		danger: 5.5	// начало опасной зоны
	},
	value: 3		// текущее значение
});
g.setValue(5);		// Установить значение в единицах
g.set(0.25); 		// Установить значение в долях единицы
```

Для демонстрации возможностей посетите http://stegantsev.github.io/gauge.js

## Поддержка браузерами

Прибор корректно отображается во всех современных браузерах:

* Chrome
* Safari 3.2+
* Firefox 3.5+
* IE 9
* Opera 10.6+
* Mobile Safari (iOS 3.2+)
* Android 2.3+
