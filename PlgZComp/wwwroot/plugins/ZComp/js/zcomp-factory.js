// zcomp-factory.js
// Factories for PlgZComp components.
// Each factory defines default properties, parses serialised JSON, and wires up the data script.

// ---------------------------------------------------------------------------
// ZStatusIndicatorFactory
// ---------------------------------------------------------------------------

rs.mimic.ZStatusIndicatorFactory = class extends rs.mimic.RegularComponentFactory {
    _createExtraScript() {
        // Called by the base factory when creating a component instance.
        // zcomp-render.js must be loaded before this is invoked (order in ScriptUrls).
        return new rs.mimic.ZStatusIndicatorScript();
    }

    createProperties() {
        let props = super.createProperties();

        props.size.width  = 40;
        props.size.height = 40;

        // circular shape via full corner radius
        let cr = new rs.mimic.CornerRadius();
        cr.topLeft = cr.topRight = cr.bottomRight = cr.bottomLeft = 50;
        props.cornerRadius = cr;

        props.backColor = "Green";

        Object.assign(props, {
            normalColor: "Green",
            alarmColor:  "Red",
            threshold:   0.0,
        });

        return props;
    }

    parseProperties(sourceProps) {
        const PropertyParser = rs.mimic.PropertyParser;
        let props = super.parseProperties(sourceProps);
        sourceProps ??= {};

        Object.assign(props, {
            normalColor: PropertyParser.parseString(sourceProps.normalColor, "Green"),
            alarmColor:  PropertyParser.parseString(sourceProps.alarmColor,  "Red"),
            threshold:   PropertyParser.parseFloat(sourceProps.threshold, 0.0),
        });

        return props;
    }

    createComponent() {
        return super.createComponent("ZStatusIndicator");
    }
};

// ---------------------------------------------------------------------------
// ZProgressBarFactory
// ---------------------------------------------------------------------------

rs.mimic.ZProgressBarFactory = class extends rs.mimic.RegularComponentFactory {
    _createExtraScript() {
        return new rs.mimic.ZProgressBarScript();
    }

    createProperties() {
        let props = super.createProperties();

        props.size.width  = 200;
        props.size.height = 30;
        props.backColor   = "#e0e0e0";

        Object.assign(props, {
            barColor:  "#4f8ef7",
            minValue:  0.0,
            maxValue:  100.0,
            _fillPct:  0.0,
        });

        return props;
    }

    parseProperties(sourceProps) {
        const PropertyParser = rs.mimic.PropertyParser;
        let props = super.parseProperties(sourceProps);
        sourceProps ??= {};

        Object.assign(props, {
            barColor:  PropertyParser.parseString(sourceProps.barColor, "#4f8ef7"),
            minValue:  PropertyParser.parseFloat(sourceProps.minValue, 0.0),
            maxValue:  PropertyParser.parseFloat(sourceProps.maxValue, 100.0),
            _fillPct:  0.0,
        });

        return props;
    }

    createComponent() {
        return super.createComponent("ZProgressBar");
    }
};

// ---------------------------------------------------------------------------
// ZGaugeFactory
// ---------------------------------------------------------------------------

rs.mimic.ZGaugeFactory = class extends rs.mimic.RegularComponentFactory {
    _createExtraScript() {
        return new rs.mimic.ZGaugeScript();
    }

    createProperties() {
        let props = super.createProperties();

        props.size.width  = 200;
        props.size.height = 145;
        props.backColor   = "transparent";

        Object.assign(props, {
            gaugeColor: "#4f8ef7",
            trackColor: "#e0e0e0",
            minValue:   0.0,
            maxValue:   100.0,
            text:       "",
            _fillPct:   0.0,
            // _curVal intentionally omitted — set at runtime by ZGaugeScript only
        });

        return props;
    }

    parseProperties(sourceProps) {
        const PP = rs.mimic.PropertyParser;
        let props = super.parseProperties(sourceProps);
        sourceProps ??= {};

        Object.assign(props, {
            gaugeColor: PP.parseString(sourceProps.gaugeColor, "#4f8ef7"),
            trackColor: PP.parseString(sourceProps.trackColor, "#e0e0e0"),
            minValue:   PP.parseFloat(sourceProps.minValue, 0.0),
            maxValue:   PP.parseFloat(sourceProps.maxValue, 100.0),
            text:       PP.parseString(sourceProps.text, ""),
            _fillPct:   0.0,
        });

        return props;
    }

    createComponent() {
        return super.createComponent("ZGauge");
    }
};

// Registers the factories. The function name must be unique.
function registerZCompFactories() {
    let componentFactories = rs.mimic.FactorySet.componentFactories;
    componentFactories.set("ZStatusIndicator", new rs.mimic.ZStatusIndicatorFactory());
    componentFactories.set("ZProgressBar",     new rs.mimic.ZProgressBarFactory());
    componentFactories.set("ZGauge",           new rs.mimic.ZGaugeFactory());
}

registerZCompFactories();
