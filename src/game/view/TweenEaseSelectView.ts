class TweenEaseSelectView extends BaseView {
	public constructor() {
		super();
	}

	public gp_item: eui.Group;
	public btn_close: eui.Button;
	public btn_clear: eui.Button;

	private _clickFunc: (text: string) => void

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.gp_item.removeChildren()
		for (const value of [
			"quadIn", "quadOut", "quadInOut",
			"cubicIn", "cubicOut", "cubicInOut",
			"quartIn", "quartOut", "quartInOut",
			"quintIn", "quintOut", "quintInOut",
			"sineIn", "sineOut", "sineInOut",
			"backIn", "backOut", "backInOut",
			"circIn", "circOut", "circInOut",
			"bounceIn", "bounceOut", "bounceInOut",
			"elasticIn", "elasticOut", "elasticInOut"
		]
		) {
			const gp = new eui.Group()
			gp.width = 200;
			gp.height = 100
			const lb = new eui.Label(value)
			gp.addChild(lb)
			lb.horizontalCenter = lb.verticalCenter = 0;
			this.addTouchTapEvent(gp, () => {
				if (this._clickFunc) {
					this._clickFunc(value)
				}
				this.hide();
			})

			this.gp_item.addChild(gp)
		}


		this.addTouchTapEvent(this.btn_clear, () => {
			if (this._clickFunc) {
				this._clickFunc("")
			}
			this.hide();
		})

		this.addTouchTapEvent(this.btn_close, () => {
			this.hide();
		})
	}

	public show(clickFunc: (text: string) => void) {
		this._clickFunc = clickFunc
		super.show()
	}

	public hide() {
		this._clickFunc = undefined;
		super.hide()
	}

}