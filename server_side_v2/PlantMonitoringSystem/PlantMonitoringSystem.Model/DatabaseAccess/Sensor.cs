﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlantMonitoringSystem.Model
{
    public partial class Sensor
    {
        public static explicit operator Sensor(Database.sensor raw)
        {
            if (raw != null)
            {
                return new Sensor()
                {
                    Id = raw.id,
                    SensorType = raw.sensor_type,
                    FriendlyName = raw.friendly_name,
                    MeasurementName = raw.measurement_name,
                    MeasurementUnit = raw.measurement_unit,
                    NodeId = raw.node_id,
                };
            }
            else
            {
                return null;
            }
        }
        public static Database.sensor toRaw(Sensor data)
        {
            var raw = new Database.sensor()
            {
                sensor_type = data.SensorType,
                friendly_name = data.FriendlyName,
                measurement_name = data.MeasurementName,
                measurement_unit = data.MeasurementUnit,
                node_id = data.NodeId,
            };

            if (data.Id != null)
            {
                raw.id = (int)data.Id;
            }

            return raw;
        }

        public static Sensor Get(int id)
        {
            var result = ModelContext.GetInstance().sensors.FirstOrDefault(x => x.id == id);
            return (Sensor)result;
        }

        public static async Task<Sensor> Insert(Sensor data)
        {
            var ctx = ModelContext.GetInstance();

            ctx.sensors.Add(toRaw(data));

            await ctx.SaveChangesAsync();
            return (Sensor)ctx.sensors.OrderByDescending(x => x.id).FirstOrDefault();
        }

        public static async Task<Sensor> Update(Sensor data)
        {
            var ctx = ModelContext.GetNewInstance();

            var raw = toRaw(data);
            ctx.sensors.Attach(raw);
            System.Data.Entity.Infrastructure.DbEntityEntry<Database.sensor> entry = ctx.Entry(raw);
            entry.State = System.Data.Entity.EntityState.Modified;

            await ctx.SaveChangesAsync();

            return Get((int)data.Id);
        }

        public static async Task<List<Sensor>> Update(List<Sensor> list)
        {
            var ctx = ModelContext.GetNewInstance();

            foreach (var data in list)
            {
                var raw = toRaw(data);
                ctx.sensors.Attach(raw);
                System.Data.Entity.Infrastructure.DbEntityEntry<Database.sensor> entry = ctx.Entry(raw);
                entry.State = System.Data.Entity.EntityState.Modified;
            }

            await ctx.SaveChangesAsync();

            return List();
        }

        public static Sensor Delete(int id)
        {
            throw new NotImplementedException();
        }

        public static List<Sensor> List()
        {
            var result = ModelContext.GetInstance().sensors
                .Take(100)
                .ToList();
            return result.Select(x => (Sensor)x).ToList();
        }

        public static SensorReading LastReading(int id)
        {
            var result = ModelContext.GetInstance().sensorreadings
                .Where(x => x.sensor_id == id)
                .OrderByDescending(x => x.reading_date)
                .FirstOrDefault();
            return (SensorReading)result;
        }

        public static List<SensorReading> ListReadings(int id)
        {
            var result = ModelContext.GetInstance().sensorreadings
                .Where(x => x.sensor_id == id)
                .OrderByDescending(x => x.reading_date)
                .Take(1000)
                .ToList();
            return result.Select(x => (SensorReading)x).ToList();
        }

        public static List<SensorReading> ListReadings(int id, DateTime startDate, DateTime endDate)
        {
            var result = ModelContext.GetInstance().sensorreadings
                .Where(x => x.sensor_id == id && x.reading_date > startDate && x.reading_date < endDate)
                .OrderBy(x => x.reading_date)
                .Take(1000)
                .ToList();
            return result.Select(x => (SensorReading)x).ToList();
        }

        public static decimal AverageReadings(int id, DateTime startDate, DateTime endDate)
        {
            return ModelContext.GetInstance().sensorreadings
                .Where(x => x.sensor_id == id && x.reading_date > startDate && x.reading_date < endDate)
                .Select(x => x.reading)
                .DefaultIfEmpty(0)
                .Average();
        }
        public static bool IsOnline(int id)
        {
            DateTime startDate = DateTime.Now.AddMinutes(-5);
            DateTime endDate = DateTime.Now;
            var result = ModelContext.GetInstance().sensorreadings
                .Count(x => x.sensor_id == id && x.reading_date > startDate && x.reading_date < endDate);
            return result > 0;
        }
    }
}
