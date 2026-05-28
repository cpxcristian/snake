(function ($) {
	$.extend($.fn, {
		parameters: {
			width: 400,
			height: 400,
			bounds: {
				top: 1,
				right: 20,
				bottom: 20,
				left: 1,
			},
			blockSize: {
				width: 0,
				height: 0,
			},
			snakeLenght: 3,
			trace: new Array(),
			itemPosition: new Array(),
			advanceDirection: "right",
			bucle: "",
		},
		snake: function () {
			var t = this;
			var p = this.parameters;
			this.createWindow();

			p.trace = [
				{ x: 3, y: 1 },
				{ x: 2, y: 1 },
				{ x: 1, y: 1 },
			];

			this.drawSnake();

			$("body").keydown(function (e) {
				switch (e.keyCode) {
					case 37:
						if (p.advanceDirection != "right")
							p.advanceDirection = "left";
						break;
					case 38:
						if (p.advanceDirection != "bottom")
							p.advanceDirection = "top";
						break;
					case 39:
						if (p.advanceDirection != "left")
							p.advanceDirection = "right";
						break;
					case 40:
						if (p.advanceDirection != "top")
							p.advanceDirection = "bottom";
						break;
				}
			});

			this.setRandomItem();

			p.bucle = setInterval(function () {
				t.moveSnake();
			}, 200);
		},
		createWindow: function () {
			var p = this.parameters;
			p.blockSize.width = p.width / p.bounds.right;
			p.blockSize.height = p.height / p.bounds.bottom;
			this.css({
				"width": p.width + "px",
				"height": p.height + "px",
				"min-width": p.width + "px",
			});
			var content = '';
			for (i = 1; i <= p.bounds.bottom; i++) {
				content += '<div class="row">';
				for (j = 1; j <= p.bounds.right; j++) {
					content += '<div id="cell-' + i + '-' + j + '" class="cell" style="width:' + p.blockSize.width + 'px;height:' + p.blockSize.height + 'px;"></div>';
				}
				content += '</div>';
			}

			this.html(content);
		},
		drawSnake: function () {
			var p = this.parameters;
			$(".cell").removeClass("snakeHead");
			$(".cell").removeClass("isSnake");
			$('#cell-' + p.trace[0].y + '-' + p.trace[0].x).addClass("isSnake snakeHead");
			for (var i = 1; i < p.snakeLenght; i++) {
				$('#cell-' + (p.trace[i].y) + '-' + p.trace[i].x).addClass("isSnake");
			}
		},
		moveSnake: function () {
			var t = this;
			var p = this.parameters;
			if (t.isAlive()) {
				switch (p.advanceDirection) {
					case "top":
						p.trace.unshift({ x: p.trace[0].x, y: parseFloat(p.trace[0].y) - 1 });
						break;
					case "right":
						p.trace.unshift({ x: parseFloat(p.trace[0].x) + 1, y: p.trace[0].y });
						break;
					case "bottom":
						p.trace.unshift({ x: p.trace[0].x, y: parseFloat(p.trace[0].y) + 1 });
						break;
					case "left":
						p.trace.unshift({ x: parseFloat(p.trace[0].x) - 1, y: p.trace[0].y });
						break;
				}
				if (p.trace[0].x == p.itemPosition.x && p.trace[0].y == p.itemPosition.y) {
					t.itemEat();
				}
				p.trace.splice(p.snakeLenght);
				t.drawSnake();
			}
			else {
				console.log("nel prro");
				clearInterval(p.bucle);
				t.showMessage("isOver");
			}
		},
		isAlive: function () {
			var result = true;
			var p = this.parameters;

			if ((p.trace[0].x <= p.bounds.left && p.advanceDirection == "left") ||
				(p.trace[0].x >= p.bounds.right && p.advanceDirection == "right") ||
				(p.trace[0].y <= p.bounds.top && p.advanceDirection == "top") ||
				(p.trace[0].y >= p.bounds.bottom && p.advanceDirection == "bottom")) {
				result = false;
			}
			for (var i = 1; i < p.snakeLenght; i++) {
				if (parseFloat(p.trace[0].x) == parseFloat(p.trace[i].x) && parseFloat(p.trace[0].y) == parseFloat(p.trace[i].y)) {
					result = false;
					break;
				}
			}
			return result;
		},
		showMessage: function (message) {
			//alert(message);
		},
		setRandomItem: function () {
			var t = this;
			var p = this.parameters;
			var x = Math.floor((Math.random() * p.bounds.right) + p.bounds.left);
			var y = Math.floor((Math.random() * p.bounds.bottom) + p.bounds.top);

			var isAvailabletoSet = true;
			for (var i = 0; i < p.snakeLenght; i++) {
				/*console.log(p.trace[i].y);
				console.log(p.trace[i].x);*/
				if (parseFloat(x) == parseFloat(p.trace[i].x) && parseFloat(y) == parseFloat(p.trace[i].y)) {
					isAvailabletoSet = false;
					break;
				}
			}

			if (isAvailabletoSet) {
				$('#cell-' + y + '-' + x).addClass("isItem");
				p.itemPosition = { x: x, y: y };
			}
			else {
				t.setRandomItem();
			}
		},
		itemEat: function () {
			var t = this;
			var p = this.parameters;
			p.snakeLenght += 1;
			$('.cell').removeClass("isItem");
			t.setRandomItem();
		},
	});
})(jQuery);