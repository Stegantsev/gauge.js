(function () {
	function Gauge(opts) {
		var id = opts.id || 'canvas',
            width = opts.width || 300;

        var parent = document.getElementById(id);

        var canvas = document.createElement('canvas');
        parent.appendChild(canvas);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', width);

        this.ctx = canvas.getContext("2d");
        this.radius = canvas.height / 2;

        this.ctx.translate(this.radius, this.radius);
		this.radius = this.radius * 0.75;

        this.width = width;
        this.name = opts.name;
        this.index = opts.index;
        this.value = opts.value || 0;
        this.maxValue = opts.maxValue || 10;
        this.scale_warning = opts.scaleRange && opts.scaleRange.warning || this.maxValue * 0.7;
        this.scale_danger = opts.scaleRange && opts.scaleRange.danger || this.maxValue * 0.9;
        this.scaleInside = opts.scaleInside || false;
        this.color_background = opts.colors && opts.colors.background || '#fff';
        this.color_texts = opts.colors && opts.colors.texts || '#000';
        this.color_hands = opts.colors && opts.colors.hands || '#1e98e4';
        this.color_base = opts.colors && opts.colors.base || '#666';
        this.color_warning = opts.colors && opts.colors.warning || '#fa0';
        this.color_danger = opts.colors && opts.colors.danger || '#f00';

        this.drawGauge(this.value);
    }

    Gauge.prototype.drawGauge = function(value) {
		var ctx = this.ctx,
			radius = this.radius,
            maxValue = this.maxValue;

        ctx.fillStyle = this.color_background;
        ctx.fillRect(-this.width/2, -this.width/2, this.width, this.width);

        var scale_warning = 0.75 * Math.PI + this.scale_warning * 1.5 * Math.PI / maxValue,
            scale_danger = 0.75 * Math.PI + this.scale_danger * 1.5 * Math.PI / maxValue;

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0.75 * Math.PI, scale_warning);
        ctx.strokeStyle = this.color_base;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius, scale_warning, scale_danger);
        ctx.strokeStyle = this.color_warning;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius, scale_danger, 0.25 * Math.PI);
        ctx.strokeStyle = this.color_danger;
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = this.color_texts;
        var ang, inside = this.scaleInside ? -1 : 1;
        for (var num = 0; num < maxValue * 10 + 1; num++) {
            ang = 0.25 * Math.PI + num * 1.5 * Math.PI / (maxValue * 10);
            ctx.rotate(ang);
            if (
                (maxValue < 100 && num % 10 == 0) ||
                (maxValue >= 100 && maxValue < 200 && num % 100 == 0) ||
                (maxValue >= 200 && maxValue < 500 && num % 500 == 0) ||
                (maxValue >= 500 && num % 1000 == 0)
            ) {
                ctx.fillRect(0, radius * (1 + inside * 0.07), 1, inside * 5);
            } else if(
                maxValue <= 20 ||
                (maxValue >= 20 && maxValue < 50 && num % 2 == 0) ||
                (maxValue >= 50 && maxValue < 100 && num % 5 == 0) ||
                (maxValue >= 100 && maxValue < 200 && num % 10 == 0) ||
                (maxValue >= 200 && maxValue < 500 && num % 100 == 0) ||
                (maxValue >= 500 && maxValue <= 2000 && num % 200 == 0)
            ) {
                ctx.fillRect(0, radius * (1 + inside * 0.08), 1, 1);
            }
            ctx.rotate(-ang);
        }

        var ang, length = radius * (1 + inside * 0.2);
        ctx.font = radius * 0.1 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        for (var num = 0; num < maxValue + 1; num++) {
            ang = 1.25 * Math.PI + num * 1.5 * Math.PI / maxValue;
            if (
                maxValue <= 20 ||
                (maxValue >= 20 && maxValue < 50 && num % 2 == 0) ||
                (maxValue >= 50 && maxValue < 100 && num % 5 == 0) ||
                (maxValue >= 100 && maxValue < 200 && num % 10 == 0) ||
                (maxValue >= 200 && maxValue < 500 && num % 50 == 0) ||
                (maxValue >= 500 && maxValue <= 1000 && num % 100 == 0) ||
                (maxValue > 1000 && num == 0) ||
                (maxValue > 1000 && num == maxValue)
            ) {
                ctx.rotate(ang);
                ctx.translate(0, -length);
                ctx.rotate(-ang);
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(ang);
                ctx.translate(0, length);
                ctx.rotate(-ang);
            }
        }
        if (this.index) {
            ctx.fillText(this.index, 0, -radius*0.5);
        }
        if (this.name) {
            ctx.font = radius*0.15 + "px arial";
            ctx.fillText(this.name, 0, radius);
        }

        if(!parseFloat(value)){
            value = 0;
        }
        value = value < 0 ? 0 : value > maxValue ? maxValue : value;
        value = value * 1.5 * Math.PI / maxValue;

        value = 1.25 * Math.PI + value;
        ctx.fillStyle = this.color_hands;
        ctx.beginPath();
        ctx.rotate(value);
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * 0.03, 0);
        ctx.lineTo(0, -radius * (1 + inside * 0.1));
        ctx.lineTo(-radius * 0.03, 0);
        ctx.rotate(-value);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.06, 0, 2 * Math.PI);
        ctx.fill();
    };
    Gauge.prototype.set = function(value) {
        if(parseFloat(value)){
            value = value < 0 ? 0 : value > 1 ? 1 : value;
            value = value * this.maxValue;
            this.drawGauge(value);
        }
    };
    Gauge.prototype.setValue = function(value) {
        this.drawGauge(value);
    };

    window.Gauge = function(userProperty) {
		return new Gauge(userProperty);
	};
})(this);