//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PlantMonitoringSystem.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class behavior
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public behavior()
        {
            this.nodes = new HashSet<node>();
        }
    
        public int id { get; set; }
        public string name { get; set; }
        public bool waterAuto { get; set; }
        public bool lightAuto { get; set; }
        public decimal lightStartHour { get; set; }
        public decimal lightStopHour { get; set; }
        public decimal waterHumLevel { get; set; }
        public int user_id { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<node> nodes { get; set; }
        public virtual systemUser systemUser { get; set; }
    }
}
