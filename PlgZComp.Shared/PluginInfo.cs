using Scada.Lang;

namespace Scada.Web.Plugins.PlgZComp
{
    /// <summary>
    /// Plugin metadata shared between the web and admin (View) assemblies.
    /// </summary>
    internal class PluginInfo : LibraryInfo
    {
        public override string Code => "PlgZComp";

        public override string Name =>
            Locale.IsRussian ? "Мои компоненты схем" : "Z Scheme Components";

        public override string Descr =>
            Locale.IsRussian
                ? "Набор пользовательских компонентов для отображения на мнемосхемах."
                : "A set of custom components for display on mimic schemes.";
    }
}
