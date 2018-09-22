class GameView extends BaseView {

    public constructor() {
        super();
        this.skinName = `GameViewSkin`
    }

    public lb_version: eui.Label;
    public lb_info: eui.Label;
    public img_gameover: eui.Image;
    public btn_add: eui.Button;
    public btn_export: eui.Button;
    public btn_reset: eui.Button;
    public btn_clear: eui.Button;
    public btn_play: eui.Button;
    public gp_item: eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init()
        this.lb_version.text = `${GameConst.appVersion}`
    }

    public init() {
        this.resetImg();
        const item = new TweenExportItem()
        item.textInput_y.text = "200";
        this.gp_item.addChild(item)

        const item2 = new TweenExportItem()
        this.gp_item.addChild(item2)

        this.addTouchTapEvent(this.btn_add, () => {
            const item = new TweenExportItem()
            this.gp_item.addChild(item)
        })

        this.addTouchTapEvent(this.btn_clear, () => {
            this.resetImg()
            this.gp_item.removeChildren()
        })

        this.addTouchTapEvent(this.btn_play, () => {
            this.resetImg()
            let tween = egret.Tween.get(this.img_gameover, { loop: true })
            for (const child of this.gp_item.$children) {
                const proObj = (child as TweenExportItem).getProObj()
                if (proObj.ease != "" && egret.Ease[proObj.ease]) {
                    tween.to(proObj.prop, proObj.time, egret.Ease[proObj.ease]);
                } else {
                    tween.to(proObj.prop, proObj.time);
                }
            }
        })

        this.addTouchTapEvent(this.btn_reset, () => {
            this.resetImg()
        })

        this.addTouchTapEvent(this.btn_export, () => {

            let exportStr = `
egret.Tween.removeTweens(this)
this.x = 375;
this.y = 400;
this.alpha = this.scaleX = this.scaleY = 1;
this.rotation = this.skewX = this.skewY = 0;
egret.Tween.get(this, { loop: true })
`
            for (const child of this.gp_item.$children) {
                const proObj = (child as TweenExportItem).getProObj()
                let propStr = '{'
                for (const key in proObj.prop) {
                    propStr += `${key}:${proObj.prop[key]},`
                }
                propStr += '}'
                if (propStr == "{}") {
                    exportStr += `.wait(${proObj.time})`
                } else {
                    if (proObj.ease != "" && egret.Ease[proObj.ease]) {
                        exportStr += `.to(${propStr}, ${proObj.time}, egret.Ease.${proObj.ease})`
                    } else {
                        exportStr += `.to(${propStr}, ${proObj.time})`
                    }
                }
            }
            exportStr += `
`
            console.log(exportStr)
            this.download(exportStr)
        })
    }

    private resetImg() {
        egret.Tween.removeTweens(this.img_gameover)
        this.img_gameover.x = 375;
        this.img_gameover.y = 400;
        this.img_gameover.alpha = this.img_gameover.scaleX = this.img_gameover.scaleY = 1;
        this.img_gameover.rotation = this.img_gameover.skewX = this.img_gameover.skewY = 0;
    }

    public resetView() {

    }


    /**每帧刷新 */
    public update() {
        let lb_info_text = ''
        let index = 0;
        for (const value of ["x", "y", "scaleX", "scaleY", "alpha", "rotation", "skewX", "skewY"]) //, "width", "height", "anchorOffsetX", "anchorOffsetY"
        {
            lb_info_text += `${value}:${this.img_gameover[value].toFixed(1)}  `
            index++;
            if (index % 4 == 0) {
                lb_info_text += `\n`
            }
        }
        this.lb_info.text = lb_info_text;
    }

    // Function to download data to a file
    private download(data) {
        try {
            const filename = `export-tween-example-${Date.now()}.txt`;
            const file = new File([data], filename, { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(file);
        } catch (e) {

        }
    }
}


