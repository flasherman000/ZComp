// zcomp-descr.js
// Property descriptors for PlgZComp components.
// Loaded in edit mode only — drives the property grid in the Mimic editor.

// ---------------------------------------------------------------------------
// ZStatusIndicatorDescriptor
// ---------------------------------------------------------------------------

rs.mimic.ZStatusIndicatorDescriptor = class extends rs.mimic.RegularComponentDescriptor {
    constructor() {
        super();
        const KnownCategory    = rs.mimic.KnownCategory;
        const BasicType        = rs.mimic.BasicType;
        const PropertyEditor   = rs.mimic.PropertyEditor;
        const PropertyDescriptor = rs.mimic.PropertyDescriptor;

        // appearance
        this.add(new PropertyDescriptor({
            name:        "normalColor",
            displayName: "Normal color",
            category:    KnownCategory.APPEARANCE,
            type:        BasicType.STRING,
            editor:      PropertyEditor.COLOR_DIALOG
        }));

        this.add(new PropertyDescriptor({
            name:        "alarmColor",
            displayName: "Alarm color",
            category:    KnownCategory.APPEARANCE,
            type:        BasicType.STRING,
            editor:      PropertyEditor.COLOR_DIALOG
        }));

        // behavior
        this.add(new PropertyDescriptor({
            name:        "threshold",
            displayName: "Threshold",
            category:    KnownCategory.BEHAVIOR,
            type:        BasicType.FLOAT
        }));
    }
};

// ---------------------------------------------------------------------------
// ZProgressBarDescriptor
// ---------------------------------------------------------------------------

rs.mimic.ZProgressBarDescriptor = class extends rs.mimic.RegularComponentDescriptor {
    constructor() {
        super();
        const KnownCategory    = rs.mimic.KnownCategory;
        const BasicType        = rs.mimic.BasicType;
        const PropertyEditor   = rs.mimic.PropertyEditor;
        const PropertyDescriptor = rs.mimic.PropertyDescriptor;

        // appearance
        this.add(new PropertyDescriptor({
            name:        "barColor",
            displayName: "Bar color",
            category:    KnownCategory.APPEARANCE,
            type:        BasicType.STRING,
            editor:      PropertyEditor.COLOR_DIALOG
        }));

        // behavior
        this.add(new PropertyDescriptor({
            name:        "minValue",
            displayName: "Min value",
            category:    KnownCategory.BEHAVIOR,
            type:        BasicType.FLOAT
        }));

        this.add(new PropertyDescriptor({
            name:        "maxValue",
            displayName: "Max value",
            category:    KnownCategory.BEHAVIOR,
            type:        BasicType.FLOAT
        }));
    }
};

// ---------------------------------------------------------------------------
// ZGaugeDescriptor
// ---------------------------------------------------------------------------

rs.mimic.ZGaugeDescriptor = class extends rs.mimic.RegularComponentDescriptor {
    constructor() {
        super();
        const KnownCategory    = rs.mimic.KnownCategory;
        const BasicType        = rs.mimic.BasicType;
        const PropertyEditor   = rs.mimic.PropertyEditor;
        const PropertyDescriptor = rs.mimic.PropertyDescriptor;

        // general
        this.add(new PropertyDescriptor({
            name:        "text",
            displayName: "Title",
            category:    KnownCategory.GENERAL,
            type:        BasicType.STRING
        }));

        // appearance
        this.add(new PropertyDescriptor({
            name:        "gaugeColor",
            displayName: "Gauge color",
            category:    KnownCategory.APPEARANCE,
            type:        BasicType.STRING,
            editor:      PropertyEditor.COLOR_DIALOG
        }));

        this.add(new PropertyDescriptor({
            name:        "trackColor",
            displayName: "Track color",
            category:    KnownCategory.APPEARANCE,
            type:        BasicType.STRING,
            editor:      PropertyEditor.COLOR_DIALOG
        }));

        // behavior
        this.add(new PropertyDescriptor({
            name:        "minValue",
            displayName: "Min value",
            category:    KnownCategory.BEHAVIOR,
            type:        BasicType.FLOAT
        }));

        this.add(new PropertyDescriptor({
            name:        "maxValue",
            displayName: "Max value",
            category:    KnownCategory.BEHAVIOR,
            type:        BasicType.FLOAT
        }));
    }
};

// Registers the descriptors. The function name must be unique.
function registerZCompDescriptors() {
    let componentDescriptors = rs.mimic.DescriptorSet.componentDescriptors;
    componentDescriptors.set("ZStatusIndicator", new rs.mimic.ZStatusIndicatorDescriptor());
    componentDescriptors.set("ZProgressBar",     new rs.mimic.ZProgressBarDescriptor());
    componentDescriptors.set("ZGauge",           new rs.mimic.ZGaugeDescriptor());
}

registerZCompDescriptors();
