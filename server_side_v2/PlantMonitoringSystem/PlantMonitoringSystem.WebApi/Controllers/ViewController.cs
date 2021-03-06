﻿using PlantMonitoringSystem.Core;
using PlantMonitoringSystem.Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PlantMonitoringSystem.WebApi.Controllers
{
    [RoutePrefix("api/view")]
    public class ViewController : ApiController
    {

        [HttpGet]
        [Route("nodes")]
        public HttpResponseMessage ViewNodes()
        {
            return Request.CreateResponse(HttpStatusCode.OK, NodesView.GetNodeList());
        }

        [HttpGet]
        [Route("node/{id}")]
        public HttpResponseMessage ViewNodes(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, NodesView.GetNode(id));
        }

        [HttpGet]
        [Route("sensor/{id}/readings")]
        public HttpResponseMessage ViewSensorReadings(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, SensorViewReadings.GetLastReadings(id));
        }
    }
}
