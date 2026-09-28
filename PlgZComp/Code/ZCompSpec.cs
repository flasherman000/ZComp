using Scada.Web.Plugins.PlgMimic.Components;

namespace Scada.Web.Plugins.PlgZComp.Code
{
    /// <summary>
    /// Describes the component library to the Mimic engine:
    /// which component types exist, where their assets are, and (in edit mode) their property descriptors.
    /// In Mimic, components have no C# model classes — properties, parsing, and rendering are all in JS.
    /// </summary>
    public class ZCompSpec : IComponentSpec
    {
        public ZCompSpec(bool editMode)
        {
            var group = new ComponentGroup { Name = "Z Components" };
            group.Items.Add(new ComponentItem { TypeName = "ZStatusIndicator", DisplayName = "Status Indicator" });
            group.Items.Add(new ComponentItem { TypeName = "ZProgressBar",     DisplayName = "Progress Bar" });
            group.Items.Add(new ComponentItem { TypeName = "ZGauge",           DisplayName = "Gauge" });

            ComponentGroups = new List<ComponentGroup> { group };
            SubtypeGroups   = new List<SubtypeGroup>();
            StyleUrls       = new List<string> { "/plugins/ZComp/css/zcomp.css" };

            // Descriptor scripts are only needed in the editor (property grid)
            ScriptUrls = editMode
                ? new List<string>
                  {
                      "/plugins/ZComp/js/zcomp-factory.js",
                      "/plugins/ZComp/js/zcomp-render.js",
                      "/plugins/ZComp/js/zcomp-descr.js",
                  }
                : new List<string>
                  {
                      "/plugins/ZComp/js/zcomp-factory.js",
                      "/plugins/ZComp/js/zcomp-render.js",
                  };
        }

        public List<ComponentGroup> ComponentGroups { get; }
        public List<SubtypeGroup>   SubtypeGroups   { get; }
        public List<string>         StyleUrls        { get; }
        public List<string>         ScriptUrls       { get; }
    }
}
