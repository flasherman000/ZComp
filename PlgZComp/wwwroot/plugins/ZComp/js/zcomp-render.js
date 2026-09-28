// zcomp-render.js
// Scripts and renderers for PlgZComp components.
// Scripts handle data binding; renderers handle DOM creation and updates.

// ---------------------------------------------------------------------------
// ZStatusIndicatorScript  (data logic — wired up by ZStatusIndicatorFactory)
// ---------------------------------------------------------------------------

rs.mimic.ZStatusIndicatorScript = class extends rs.mimic.ComponentScript {
    dataUpdated(args) {
        let cnlNum = args.component.bindings?.inCnlNum;
        if (!cnlNum || cnlNum <= 0) return;

        let curData  = args.dataProvider.getCurData(cnlNum);
        let prevData = args.dataProvider.getPrevData(cnlNum);
        if (!args.dataProvider.dataChanged(curData, prevData)) return;

        let props   = args.component.properties;
        let isAlarm = curData.d.stat > 0 && curData.d.val <= props.threshold;
        let color   = isAlarm ? props.alarmColor : props.normalColor;

        if (props.backColor !== color) {
            props.backColor      = color;
            args.propertyChanged = true;
        }
    }
};

// ---------------------------------------------------------------------------
// ZStatusIndicatorRenderer  (DOM)
// ---------------------------------------------------------------------------

rs.mimic.ZStatusIndicatorRenderer = class extends rs.mimic.RegularComponentRenderer {
    _setClasses(componentElem, component, renderContext) {
        super._setClasses(componentElem, component, renderContext);
        componentElem.addClass("zcomp-status-indicator");
    }
};

// ---------------------------------------------------------------------------
// ZProgressBarScript  (data logic — wired up by ZProgressBarFactory)
// ---------------------------------------------------------------------------

rs.mimic.ZProgressBarScript = class extends rs.mimic.ComponentScript {
    dataUpdated(args) {
        let cnlNum = args.component.bindings?.inCnlNum;
        if (!cnlNum || cnlNum <= 0) return;

        let curData  = args.dataProvider.getCurData(cnlNum);
        let prevData = args.dataProvider.getPrevData(cnlNum);
        if (!args.dataProvider.dataChanged(curData, prevData)) return;

        let props = args.component.properties;
        let min   = props.minValue ?? 0;
        let max   = props.maxValue ?? 100;
        let range = max - min;
        let pct   = range === 0
            ? 0
            : Math.min(100, Math.max(0, (curData.d.val - min) / range * 100));

        if (props._fillPct !== pct) {
            props._fillPct       = pct;
            args.propertyChanged = true;
        }
    }
};

// ---------------------------------------------------------------------------
// ZProgressBarRenderer  (DOM)
// ---------------------------------------------------------------------------

rs.mimic.ZProgressBarRenderer = class extends rs.mimic.RegularComponentRenderer {
    _completeDom(componentElem, component, renderContext) {
        componentElem.append("<div class='zcomp-pb-fill'></div>");
    }

    _setClasses(componentElem, component, renderContext) {
        super._setClasses(componentElem, component, renderContext);
        componentElem.addClass("zcomp-progress-bar");
    }

    _setProps(componentElem, component, renderContext) {
        super._setProps(componentElem, component, renderContext);
        let props = component.properties;
        componentElem.find(".zcomp-pb-fill").css({
            "width":            (props._fillPct ?? 0).toFixed(2) + "%",
            "background-color": props.barColor || "#4f8ef7"
        });
    }
};

// ---------------------------------------------------------------------------
// ZGaugeScript  (data logic — wired up by ZGaugeFactory)
// ---------------------------------------------------------------------------

// Fixed SVG coordinate constants shared by script and renderer.
const GAUGE_CX      = 100;
const GAUGE_CY      = 90;
const GAUGE_R       = 72;
const GAUGE_ARC_LEN = Math.PI * GAUGE_R; // semicircle arc length ≈ 226

// Precomputed tick lines at 10 % increments along the arc.
// Arc angle at parameter t: π(1+t), so t=0 → left end, t=1 → right end, t=0.5 → top.
const GAUGE_TICKS_SVG = (() => {
    let s = '';
    for (let i = 0; i <= 10; i++) {
        const angle = Math.PI * (1 + i / 10);
        const isMaj = (i % 5 === 0);
        const r1    = GAUGE_R - 7;                // just inside the arc stroke
        const r2    = r1 - (isMaj ? 8 : 5);
        const ca    = Math.cos(angle), sa = Math.sin(angle);
        const cls   = 'zcomp-gauge-tick' + (isMaj ? ' zcomp-gauge-tick-maj' : '');
        s += `<line class="${cls}"` +
             ` x1="${(GAUGE_CX + r1 * ca).toFixed(1)}" y1="${(GAUGE_CY + r1 * sa).toFixed(1)}"` +
             ` x2="${(GAUGE_CX + r2 * ca).toFixed(1)}" y2="${(GAUGE_CY + r2 * sa).toFixed(1)}"/>`;
    }
    return s;
})();

rs.mimic.ZGaugeScript = class extends rs.mimic.ComponentScript {
    dataUpdated(args) {
        let cnlNum = args.component.bindings?.inCnlNum;
        if (!cnlNum || cnlNum <= 0) return;

        let curData  = args.dataProvider.getCurData(cnlNum);
        let prevData = args.dataProvider.getPrevData(cnlNum);
        if (!args.dataProvider.dataChanged(curData, prevData)) return;

        let props = args.component.properties;
        let min   = props.minValue ?? 0;
        let max   = props.maxValue ?? 100;
        let range = max - min;
        let val   = curData.d.val;
        let pct   = range === 0 ? 0 : Math.min(100, Math.max(0, (val - min) / range * 100));

        if (props._fillPct !== pct) {
            props._fillPct       = pct;
            props._curVal        = val;   // runtime-only, not in initial props
            args.propertyChanged = true;
        }
    }
};

// ---------------------------------------------------------------------------
// ZGaugeRenderer  (DOM)
// ---------------------------------------------------------------------------

rs.mimic.ZGaugeRenderer = class extends rs.mimic.RegularComponentRenderer {
    _completeDom(componentElem, component, renderContext) {
        const cx = GAUGE_CX, cy = GAUGE_CY, r = GAUGE_R;
        componentElem.append(
            `<svg class="zcomp-gauge-svg" viewBox="0 0 200 145" preserveAspectRatio="xMidYMid meet">` +
                `<path class="zcomp-gauge-track"/>` +
                `<path class="zcomp-gauge-fill"/>` +
                `<g class="zcomp-gauge-ticks">${GAUGE_TICKS_SVG}</g>` +
                `<text class="zcomp-gauge-lbl zcomp-gauge-min-lbl" text-anchor="middle" x="${cx - r}" y="${cy + 22}"></text>` +
                `<text class="zcomp-gauge-lbl zcomp-gauge-max-lbl" text-anchor="middle" x="${cx + r}" y="${cy + 22}"></text>` +
                `<text class="zcomp-gauge-val" text-anchor="middle" x="${cx}" y="${cy - 8}"></text>` +
                `<text class="zcomp-gauge-title-txt" text-anchor="middle" x="${cx}" y="140"></text>` +
            `</svg>`
        );
    }

    _setClasses(componentElem, component, renderContext) {
        super._setClasses(componentElem, component, renderContext);
        componentElem.addClass("zcomp-gauge");
    }

    _setProps(componentElem, component, renderContext) {
        super._setProps(componentElem, component, renderContext);

        const cx  = GAUGE_CX, cy = GAUGE_CY, r = GAUGE_R;
        const arcD = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
        const props = component.properties;
        const pct   = props._fillPct ?? 0;
        const dash  = (pct / 100 * GAUGE_ARC_LEN).toFixed(1);

        const svg = componentElem.find('.zcomp-gauge-svg');

        svg.find('.zcomp-gauge-track')
            .attr({ d: arcD, stroke: props.trackColor || '#e0e0e0', 'stroke-width': 10,
                    fill: 'none', 'stroke-linecap': 'round' });

        svg.find('.zcomp-gauge-fill')
            .attr({ d: arcD, stroke: props.gaugeColor || '#4f8ef7', 'stroke-width': 10,
                    fill: 'none', 'stroke-linecap': 'round',
                    'stroke-dasharray': `${dash} 10000` });

        svg.find('.zcomp-gauge-min-lbl').text(props.minValue ?? 0);
        svg.find('.zcomp-gauge-max-lbl').text(props.maxValue ?? 100);
        svg.find('.zcomp-gauge-title-txt').text(props.text || '');

        const val = props._curVal;
        svg.find('.zcomp-gauge-val').text(
            val !== null && val !== undefined
                ? (Number.isInteger(val) ? String(val) : val.toFixed(1))
                : ''
        );
    }
};

// Registers the renderers. The function name must be unique.
function registerZCompRenderers() {
    let componentRenderers = rs.mimic.RendererSet.componentRenderers;
    componentRenderers.set("ZStatusIndicator", new rs.mimic.ZStatusIndicatorRenderer());
    componentRenderers.set("ZProgressBar",     new rs.mimic.ZProgressBarRenderer());
    componentRenderers.set("ZGauge",           new rs.mimic.ZGaugeRenderer());
}

registerZCompRenderers();
