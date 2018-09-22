class TweenExportItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = 'TweenExportItemSkin'
	}

	public textInput_time: eui.TextInput;
	public textInput_x: eui.TextInput;
	public textInput_y: eui.TextInput;
	public textInput_alpha: eui.TextInput;
	public textInput_rotation: eui.TextInput;
	public textInput_scaleX: eui.TextInput;
	public textInput_scaleY: eui.TextInput;
	public textInput_skewX: eui.TextInput;
	public textInput_skewY: eui.TextInput;
	public btn_delete: eui.Button;
	public gp_ease: eui.Group;
	public textInput_ease: eui.TextInput;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			func.removeFromParent(this);
		}, this)

		this.gp_ease.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			const tweenEaseSelectView = ViewMgr.ins().getView(TweenEaseSelectView) as TweenEaseSelectView;
			tweenEaseSelectView.show((text) => {
				this.textInput_ease.text = text;
			})
		}, this)
	}


	public getProObj() {
		let prop = {}
		for (const value of ["x", "y", "alpha", "scaleX", "scaleY", "rotation", "skewX", "skewY"]) {
			if (this[`textInput_${value}`].text == "") {
				continue;
			}
			const num = Number(this[`textInput_${value}`].text)
			if (isNaN(num)) { } else {
				if (value == "scale") {
					prop["scaleX"] = prop["scaleY"] = num;
				} else {
					prop[value] = num;
				}
			}
		}
		const time = Number(this.textInput_time.text) || 0
		const ease = this.textInput_ease.text
		return { prop, time, ease }
	}

}