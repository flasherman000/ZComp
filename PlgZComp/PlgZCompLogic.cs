using Scada.Web.Plugins.PlgMimic.Components;
using Scada.Web.Plugins.PlgZComp.Code;
using Scada.Web.Services;

namespace Scada.Web.Plugins.PlgZComp
{
    /// <summary>
    /// Plugin entry point. Discovered by Webstation via the PlgXxxLogic naming convention.
    /// Implements IComponentPlugin so the Mimic editor picks up the component library.
    /// </summary>
    public class PlgZCompLogic : PluginLogic, IComponentPlugin
    {
        public PlgZCompLogic(IWebContext webContext)
            : base(webContext)
        {
            Info = new PluginInfo();
        }

        /// <summary>
        /// Returns the component spec for this library.
        /// editMode = true  → called by the Mimic editor (includes descriptor scripts for the property grid).
        /// editMode = false → called by the Mimic viewer (descriptor scripts omitted).
        /// </summary>
        public IComponentSpec GetComponentSpec(bool editMode) => new ZCompSpec(editMode);
    }
}
