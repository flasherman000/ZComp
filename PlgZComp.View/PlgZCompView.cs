namespace Scada.Web.Plugins.PlgZComp.View
{
    /// <summary>
    /// Registers the plugin with the RapidSCADA Administrator application.
    /// The Administrator discovers this class by scanning ScadaAdmin\Lib for
    /// types that extend PluginView, then uses PluginInfo for display metadata.
    /// </summary>
    public class PlgZCompView : PluginView
    {
        public PlgZCompView()
        {
            Info = new PluginInfo();
        }
    }
}
