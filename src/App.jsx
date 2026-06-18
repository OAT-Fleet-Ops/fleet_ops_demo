import React, { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// FAKE DATA
// ─────────────────────────────────────────────────────────────────────────────

const TODAY = '2026-06-19'

const TRUCK_FLEET = [
  { id: 't1', name: 'WA 1234 B', driver: 'Ahmad Zaki',  assistant: 'Raju Pillai',   area: 'Chow Kit / Sentul',        total: 8,  done: 5 },
  { id: 't2', name: 'WB 5678 C', driver: 'Mohd Farid',  assistant: 'Selvam Kumar',  area: 'Kepong / Sri Damansara',   total: 6,  done: 6 },
  { id: 't3', name: 'WC 9012 D', driver: 'Lee Ah Wei',  assistant: 'Muthu Raj',     area: 'Setapak / Wangsa Maju',    total: 10, done: 3 },
  { id: 't4', name: 'WD 3456 E', driver: 'Tan Ah Kow',  assistant: 'Suresh Nair',   area: 'Ampang / Pandan',          total: 7,  done: 7 },
]

const INITIAL_DELIVERIES = [
  // ── WA 1234 B — 5 delivered, 1 out, 2 pending ────────────────────────────
  { id:'d01', delivery_seq:1, outlet_name:'Restoran Nasi Kandar Pelita',  customer_name:'Client A', outlet_address:'Lot 3, Jalan Chow Kit, 50350 Kuala Lumpur',       truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00101', total_sales_amount:1850.00, time_spent_seconds:780,  temperature:4.1, arrived_at:'2026-06-19T07:22:00+08:00', submitted_at:'2026-06-19T07:35:00+08:00', warehouse_distance:5.234, remark:null,                           photo:true  },
  { id:'d02', delivery_seq:2, outlet_name:'Kedai Runcit Ah Chong',        customer_name:'Client A', outlet_address:'No 12, Jalan Sentul Pasar, 51000 Kuala Lumpur',    truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00102', total_sales_amount:620.50,  time_spent_seconds:540,  temperature:4.3, arrived_at:'2026-06-19T07:52:00+08:00', submitted_at:'2026-06-19T08:01:00+08:00', warehouse_distance:6.011, remark:null,                           photo:true  },
  { id:'d03', delivery_seq:3, outlet_name:'Warung Mak Timah',             customer_name:'Client A', outlet_address:'Blok A, Pasar Chow Kit, 50350 Kuala Lumpur',        truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00103', total_sales_amount:450.00,  time_spent_seconds:420,  temperature:4.0, arrived_at:'2026-06-19T08:18:00+08:00', submitted_at:'2026-06-19T08:25:00+08:00', warehouse_distance:6.450, remark:null,                           photo:true  },
  { id:'d04', delivery_seq:4, outlet_name:'Sri Ananda Bhavan',            customer_name:'Client A', outlet_address:'No 6, Jalan Masjid India, 50100 Kuala Lumpur',      truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00104', total_sales_amount:2100.00, time_spent_seconds:900,  temperature:4.2, arrived_at:'2026-06-19T08:45:00+08:00', submitted_at:'2026-06-19T09:00:00+08:00', warehouse_distance:7.890, remark:null,                           photo:true  },
  { id:'d05', delivery_seq:5, outlet_name:'Lotus\'s Chow Kit',            customer_name:'Client A', outlet_address:'Jalan Tuanku Abdul Halim, 50350 Kuala Lumpur',      truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00105', total_sales_amount:3200.00, time_spent_seconds:1200, temperature:4.4, arrived_at:'2026-06-19T09:22:00+08:00', submitted_at:'2026-06-19T09:42:00+08:00', warehouse_distance:8.120, remark:null,                           photo:true  },
  { id:'d06', delivery_seq:6, outlet_name:'Restoran Sup Hameed',          customer_name:'Client A', outlet_address:'No 55, Jalan Dang Wangi, 50480 Kuala Lumpur',       truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'out_for_delivery',   delivery_date:TODAY, invoice_numbers:'INV-2024-00106', total_sales_amount:980.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:9.003, remark:null,                           photo:false },
  { id:'d07', delivery_seq:7, outlet_name:'99 Speedmart Sentul',          customer_name:'Client A', outlet_address:'Jalan Sentul, 51000 Kuala Lumpur',                   truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'pending',            delivery_date:TODAY, invoice_numbers:'INV-2024-00107', total_sales_amount:750.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:9.561, remark:null,                           photo:false },
  { id:'d08', delivery_seq:8, outlet_name:'Kedai Makanan Pak Ali',        customer_name:'Client A', outlet_address:'Lot 7, Jalan Ipoh, 51200 Kuala Lumpur',              truck_id:'t1', truck_name:'WA 1234 B', driver_name:'Ahmad Zaki', assistant_name:'Raju Pillai',   status:'pending',            delivery_date:TODAY, invoice_numbers:'INV-2024-00108', total_sales_amount:510.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:10.234,remark:null,                           photo:false },

  // ── WB 5678 C — 6 delivered ───────────────────────────────────────────────
  { id:'d09', delivery_seq:1, outlet_name:'Mydin Hypermarket',            customer_name:'Client A', outlet_address:'No 1, Jalan Kepong, 52100 Kuala Lumpur',             truck_id:'t2', truck_name:'WB 5678 C', driver_name:'Mohd Farid', assistant_name:'Selvam Kumar', status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00201', total_sales_amount:2850.00, time_spent_seconds:1080, temperature:4.0, arrived_at:'2026-06-19T07:18:00+08:00', submitted_at:'2026-06-19T07:36:00+08:00', warehouse_distance:12.340,remark:null,                           photo:true  },
  { id:'d10', delivery_seq:2, outlet_name:'Happy Mart Sri Damansara',     customer_name:'Client A', outlet_address:'No 88, Jalan Sri Damansara, 52200 Kuala Lumpur',     truck_id:'t2', truck_name:'WB 5678 C', driver_name:'Mohd Farid', assistant_name:'Selvam Kumar', status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00202', total_sales_amount:1430.00, time_spent_seconds:720,  temperature:4.5, arrived_at:'2026-06-19T08:02:00+08:00', submitted_at:'2026-06-19T08:14:00+08:00', warehouse_distance:13.780,remark:null,                           photo:true  },
  { id:'d11', delivery_seq:3, outlet_name:'Kedai Runcit Soon Heng',       customer_name:'Client A', outlet_address:'No 22, Jalan Kepong Baru, 52100 Kuala Lumpur',       truck_id:'t2', truck_name:'WB 5678 C', driver_name:'Mohd Farid', assistant_name:'Selvam Kumar', status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00203', total_sales_amount:390.00,  time_spent_seconds:480,  temperature:4.2, arrived_at:'2026-06-19T08:35:00+08:00', submitted_at:'2026-06-19T08:43:00+08:00', warehouse_distance:14.120,remark:null,                           photo:true  },
  { id:'d12', delivery_seq:4, outlet_name:'Fatty Crab Restaurant',        customer_name:'Client A', outlet_address:'No 17, Jalan Sri Damansara 1, 52200 Kuala Lumpur',   truck_id:'t2', truck_name:'WB 5678 C', driver_name:'Mohd Farid', assistant_name:'Selvam Kumar', status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00204', total_sales_amount:1760.00, time_spent_seconds:840,  temperature:3.9, arrived_at:'2026-06-19T09:05:00+08:00', submitted_at:'2026-06-19T09:19:00+08:00', warehouse_distance:14.890,remark:null,                           photo:true  },
  { id:'d13', delivery_seq:5, outlet_name:'Sri Ananda Bhavan',            customer_name:'Client A', outlet_address:'Jalan Kepong, 52100 Kuala Lumpur',                    truck_id:'t2', truck_name:'WB 5678 C', driver_name:'Mohd Farid', assistant_name:'Selvam Kumar', status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00205', total_sales_amount:920.00,  time_spent_seconds:600,  temperature:4.3, arrived_at:'2026-06-19T09:45:00+08:00', submitted_at:'2026-06-19T09:55:00+08:00', warehouse_distance:15.340,remark:null,                           photo:true  },
  { id:'d14', delivery_seq:6, outlet_name:'Warung Mak Timah',             customer_name:'Client A', outlet_address:'Jalan Sri Damansara Tengah, 52200 Kuala Lumpur',      truck_id:'t2', truck_name:'WB 5678 C', driver_name:'Mohd Farid', assistant_name:'Selvam Kumar', status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00206', total_sales_amount:680.00,  time_spent_seconds:540,  temperature:4.1, arrived_at:'2026-06-19T10:18:00+08:00', submitted_at:'2026-06-19T10:27:00+08:00', warehouse_distance:15.890,remark:null,                           photo:true  },

  // ── WC 9012 D — 3 delivered, 1 out, 3 pending, 1 returned ────────────────
  { id:'d15', delivery_seq:1, outlet_name:'99 Speedmart Sentul',          customer_name:'Client A', outlet_address:'Jalan Wangsa Maju, 53300 Kuala Lumpur',              truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00301', total_sales_amount:560.00,  time_spent_seconds:480,  temperature:4.6, arrived_at:'2026-06-19T07:30:00+08:00', submitted_at:'2026-06-19T07:38:00+08:00', warehouse_distance:18.230,remark:null,                           photo:true  },
  { id:'d16', delivery_seq:2, outlet_name:'Kedai Runcit Ah Chong',        customer_name:'Client A', outlet_address:'No 5, Jalan Setapak, 53000 Kuala Lumpur',             truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00302', total_sales_amount:430.00,  time_spent_seconds:420,  temperature:4.4, arrived_at:'2026-06-19T08:10:00+08:00', submitted_at:'2026-06-19T08:17:00+08:00', warehouse_distance:19.100,remark:null,                           photo:true  },
  { id:'d17', delivery_seq:3, outlet_name:'Restoran Nasi Kandar Pelita',  customer_name:'Client A', outlet_address:'Jalan Gombak, 53000 Kuala Lumpur',                    truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00303', total_sales_amount:1240.00, time_spent_seconds:660,  temperature:4.2, arrived_at:'2026-06-19T08:48:00+08:00', submitted_at:'2026-06-19T08:59:00+08:00', warehouse_distance:20.450,remark:null,                           photo:true  },
  { id:'d18', delivery_seq:4, outlet_name:'Lotus\'s Chow Kit',            customer_name:'Client A', outlet_address:'Jalan Wangsa 6, 53300 Kuala Lumpur',                  truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'out_for_delivery',   delivery_date:TODAY, invoice_numbers:'INV-2024-00304', total_sales_amount:1950.00, time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:21.003,remark:null,                           photo:false },
  { id:'d19', delivery_seq:5, outlet_name:'Restoran Sup Hameed',          customer_name:'Client A', outlet_address:'No 9, Jalan Pahang, 53000 Kuala Lumpur',               truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'pending',            delivery_date:TODAY, invoice_numbers:'INV-2024-00305', total_sales_amount:870.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:21.780,remark:null,                           photo:false },
  { id:'d20', delivery_seq:6, outlet_name:'Kedai Makanan Pak Ali',        customer_name:'Client A', outlet_address:'Jalan 1/27C, Wangsa Maju, 53300 Kuala Lumpur',         truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'pending',            delivery_date:TODAY, invoice_numbers:'INV-2024-00306', total_sales_amount:340.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:22.120,remark:null,                           photo:false },
  { id:'d21', delivery_seq:7, outlet_name:'Fatty Crab Restaurant',        customer_name:'Client A', outlet_address:'Jalan Danau Kota, 53300 Kuala Lumpur',                 truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'pending',            delivery_date:TODAY, invoice_numbers:'INV-2024-00307', total_sales_amount:2400.00, time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:22.890,remark:null,                           photo:false },
  { id:'d22', delivery_seq:8, outlet_name:'Happy Mart Sri Damansara',     customer_name:'Client A', outlet_address:'Jalan Setapak Indah, 53000 Kuala Lumpur',              truck_id:'t3', truck_name:'WC 9012 D', driver_name:'Lee Ah Wei', assistant_name:'Muthu Raj',    status:'returned',           delivery_date:TODAY, invoice_numbers:'INV-2024-00308', total_sales_amount:780.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:23.450,remark:'Outlet closed — no one on site', photo:false },

  // ── WD 3456 E — 4 delivered, 1 out, 1 returned_processed ─────────────────
  { id:'d23', delivery_seq:1, outlet_name:'Mydin Hypermarket',            customer_name:'Client A', outlet_address:'Jalan Ampang, 50450 Kuala Lumpur',                    truck_id:'t4', truck_name:'WD 3456 E', driver_name:'Tan Ah Kow', assistant_name:'Suresh Nair',  status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00401', total_sales_amount:3100.00, time_spent_seconds:1320, temperature:3.9, arrived_at:'2026-06-19T07:15:00+08:00', submitted_at:'2026-06-19T07:37:00+08:00', warehouse_distance:25.670,remark:null,                           photo:true  },
  { id:'d24', delivery_seq:2, outlet_name:'Kedai Runcit Soon Heng',       customer_name:'Client A', outlet_address:'No 33, Jalan Pandan 5/6, 55100 Kuala Lumpur',          truck_id:'t4', truck_name:'WD 3456 E', driver_name:'Tan Ah Kow', assistant_name:'Suresh Nair',  status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00402', total_sales_amount:490.00,  time_spent_seconds:540,  temperature:4.0, arrived_at:'2026-06-19T08:05:00+08:00', submitted_at:'2026-06-19T08:14:00+08:00', warehouse_distance:26.110,remark:null,                           photo:true  },
  { id:'d25', delivery_seq:3, outlet_name:'Sri Ananda Bhavan',            customer_name:'Client A', outlet_address:'Jalan Ampang Hilir, 55000 Kuala Lumpur',               truck_id:'t4', truck_name:'WD 3456 E', driver_name:'Tan Ah Kow', assistant_name:'Suresh Nair',  status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00403', total_sales_amount:1680.00, time_spent_seconds:840,  temperature:4.3, arrived_at:'2026-06-19T08:42:00+08:00', submitted_at:'2026-06-19T08:56:00+08:00', warehouse_distance:27.340,remark:null,                           photo:true  },
  { id:'d26', delivery_seq:4, outlet_name:'Restoran Nasi Kandar Pelita',  customer_name:'Client A', outlet_address:'No 14, Jalan Pandan Indah, 55100 Kuala Lumpur',        truck_id:'t4', truck_name:'WD 3456 E', driver_name:'Tan Ah Kow', assistant_name:'Suresh Nair',  status:'delivered',          delivery_date:TODAY, invoice_numbers:'INV-2024-00404', total_sales_amount:910.00,  time_spent_seconds:600,  temperature:4.1, arrived_at:'2026-06-19T09:18:00+08:00', submitted_at:'2026-06-19T09:28:00+08:00', warehouse_distance:28.010,remark:null,                           photo:true  },
  { id:'d27', delivery_seq:5, outlet_name:'Kedai Runcit Ah Chong',        customer_name:'Client A', outlet_address:'Jalan Pandan Mewah, 55100 Kuala Lumpur',               truck_id:'t4', truck_name:'WD 3456 E', driver_name:'Tan Ah Kow', assistant_name:'Suresh Nair',  status:'out_for_delivery',   delivery_date:TODAY, invoice_numbers:'INV-2024-00405', total_sales_amount:320.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:28.900,remark:null,                           photo:false },
  { id:'d28', delivery_seq:6, outlet_name:'Warung Mak Timah',             customer_name:'Client A', outlet_address:'Jalan Ampang Baru, 68000 Ampang',                      truck_id:'t4', truck_name:'WD 3456 E', driver_name:'Tan Ah Kow', assistant_name:'Suresh Nair',  status:'returned_processed', delivery_date:TODAY, invoice_numbers:'INV-2024-00406', total_sales_amount:450.00,  time_spent_seconds:null, temperature:null, arrived_at:null, submitted_at:null,                               warehouse_distance:29.120,remark:'Customer rejected delivery',   photo:false },
]

const INVOICES = INITIAL_DELIVERIES.map(d => ({
  id:               'inv-' + d.id,
  invoice_number:   d.invoice_numbers,
  customer_name:    d.customer_name,
  outlet_name:      d.outlet_name,
  invoice_date:     TODAY,
  truck_name:       d.truck_name,
  amount:           d.total_sales_amount,
  warehouse_distance: d.warehouse_distance,
  deliveries:       [{ delivery_id: d.id, delivery_date: d.delivery_date }],
  products:         Array.from({ length: Math.max(4, Math.floor(d.total_sales_amount / 120)) }, (_, i) => ({
    product_name: ['Frozen Chicken Wings', 'Beef Mince', 'Lamb Shoulder', 'Pork Belly', 'Chicken Fillet',
                   'Fish Fillet', 'Prawn 500g', 'Squid Rings', 'Duck Breast', 'Chicken Liver'][i % 10],
    quantity: Math.max(1, Math.floor(10 - i)),
    uom: ['kg','kg','kg','kg','kg','kg','pkt','kg','kg','kg'][i % 10],
  })),
}))

const PICKING_RECORDS = [
  { id:'pk1', picking_number:'PICK-240617-001', truck_name:'WA 1234 B', picker:'Halim bin Saad',  reviewer:'Suhaimi Ahmad', status:'reviewed', started:'06:15', items: [
    { id:'pi1',  truck_name:'WA 1234 B', display_name:'Frozen Chicken Wings', product_type:'Poultry',  product_code:'PCW-001', total_quantity:24, uom_summary:{ kg: 24 }, is_picked:true,  is_reviewed:true,  carton_enabled:true, units_per_carton:6 },
    { id:'pi2',  truck_name:'WA 1234 B', display_name:'Beef Mince 500g',      product_type:'Beef',     product_code:'BM-002',  total_quantity:18, uom_summary:{ pkt: 18 }, is_picked:true,  is_reviewed:true,  carton_enabled:false, units_per_carton:null },
    { id:'pi3',  truck_name:'WA 1234 B', display_name:'Lamb Shoulder',        product_type:'Lamb',     product_code:'LS-003',  total_quantity:12, uom_summary:{ kg: 12 }, is_picked:true,  is_reviewed:true,  carton_enabled:true, units_per_carton:4 },
    { id:'pi4',  truck_name:'WA 1234 B', display_name:'Chicken Fillet',       product_type:'Poultry',  product_code:'CF-004',  total_quantity:30, uom_summary:{ kg: 30 }, is_picked:true,  is_reviewed:true,  carton_enabled:true, units_per_carton:10 },
  ]},
  { id:'pk2', picking_number:'PICK-240617-002', truck_name:'WB 5678 C', picker:'Razif Nordin',    reviewer:'Azlan Hamid',   status:'reviewed', started:'06:40', items: [
    { id:'pi5',  truck_name:'WB 5678 C', display_name:'Prawn 500g',           product_type:'Seafood',  product_code:'PR-005',  total_quantity:20, uom_summary:{ pkt: 20 }, is_picked:true,  is_reviewed:true,  carton_enabled:false, units_per_carton:null },
    { id:'pi6',  truck_name:'WB 5678 C', display_name:'Fish Fillet',          product_type:'Seafood',  product_code:'FF-006',  total_quantity:15, uom_summary:{ kg: 15 }, is_picked:true,  is_reviewed:true,  carton_enabled:false, units_per_carton:null },
    { id:'pi7',  truck_name:'WB 5678 C', display_name:'Duck Breast',          product_type:'Poultry',  product_code:'DB-007',  total_quantity:8,  uom_summary:{ kg: 8 },  is_picked:true,  is_reviewed:true,  carton_enabled:false, units_per_carton:null },
    { id:'pi8',  truck_name:'WB 5678 C', display_name:'Squid Rings',          product_type:'Seafood',  product_code:'SQ-008',  total_quantity:10, uom_summary:{ kg: 10 }, is_picked:true,  is_reviewed:true,  carton_enabled:false, units_per_carton:null },
  ]},
  { id:'pk3', picking_number:'PICK-240617-003', truck_name:'WC 9012 D', picker:'Hisham Kassim',  reviewer:null,            status:'picked',   started:'07:10', items: [
    { id:'pi9',  truck_name:'WC 9012 D', display_name:'Pork Belly',           product_type:'Pork',     product_code:'PB-009',  total_quantity:16, uom_summary:{ kg: 16 }, is_picked:true,  is_reviewed:false, carton_enabled:true, units_per_carton:4 },
    { id:'pi10', truck_name:'WC 9012 D', display_name:'Chicken Liver',        product_type:'Poultry',  product_code:'CL-010',  total_quantity:22, uom_summary:{ kg: 22 }, is_picked:true,  is_reviewed:false, carton_enabled:false, units_per_carton:null },
    { id:'pi11', truck_name:'WC 9012 D', display_name:'Beef Mince 500g',      product_type:'Beef',     product_code:'BM-002',  total_quantity:14, uom_summary:{ pkt: 14 }, is_picked:false, is_reviewed:false, carton_enabled:false, units_per_carton:null },
    { id:'pi12', truck_name:'WC 9012 D', display_name:'Frozen Chicken Wings', product_type:'Poultry',  product_code:'PCW-001', total_quantity:18, uom_summary:{ kg: 18 }, is_picked:false, is_reviewed:false, carton_enabled:true, units_per_carton:6 },
  ]},
  { id:'pk4', picking_number:'PICK-240617-004', truck_name:'WD 3456 E', picker:'Faizal Rahman',  reviewer:'Nordin Ismail', status:'reviewed', started:'06:05', items: [
    { id:'pi13', truck_name:'WD 3456 E', display_name:'Lamb Shoulder',        product_type:'Lamb',     product_code:'LS-003',  total_quantity:9,  uom_summary:{ kg: 9 },  is_picked:true,  is_reviewed:true,  carton_enabled:true, units_per_carton:3 },
    { id:'pi14', truck_name:'WD 3456 E', display_name:'Fish Fillet',          product_type:'Seafood',  product_code:'FF-006',  total_quantity:12, uom_summary:{ kg: 12 }, is_picked:true,  is_reviewed:true,  carton_enabled:false, units_per_carton:null },
    { id:'pi15', truck_name:'WD 3456 E', display_name:'Chicken Fillet',       product_type:'Poultry',  product_code:'CF-004',  total_quantity:28, uom_summary:{ kg: 28 }, is_picked:true,  is_reviewed:true,  carton_enabled:true, units_per_carton:7 },
    { id:'pi16', truck_name:'WD 3456 E', display_name:'Prawn 500g',           product_type:'Seafood',  product_code:'PR-005',  total_quantity:6,  uom_summary:{ pkt: 6 }, is_picked:true,  is_reviewed:true,  carton_enabled:false, units_per_carton:null },
  ]},
]

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_BADGE = {
  unassigned:         'bg-gray-100 text-gray-600',
  picking:            'bg-red-100 text-red-700',
  partially_picked:   'bg-amber-100 text-amber-700',
  pending:            'bg-yellow-100 text-yellow-700',
  out_for_delivery:   'bg-blue-100 text-blue-700',
  delivered:          'bg-green-100 text-green-700',
  returned:           'bg-orange-100 text-orange-700',
  returned_processed: 'bg-purple-100 text-purple-700',
}
const STATUS_LABEL = {
  unassigned:         'Unassigned',
  picking:            'Picking',
  partially_picked:   'Partially Picked',
  pending:            'Pending',
  out_for_delivery:   'Out for Delivery',
  delivered:          'Delivered',
  returned:           'Returned',
  returned_processed: 'Returned Processed',
}
const ALL_STATUSES = ['pending','out_for_delivery','delivered','returned','returned_processed','picking','partially_picked','unassigned']

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-MY', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' })
}
function fmtDateOnly(dateStr) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-').map(Number)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${String(d).padStart(2,'0')} ${months[m-1]} ${y}`
}
function fmtTime(s) {
  if (!s) return '—'
  const m = Math.floor(s / 60)
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`
}
function fmtTemp(val) {
  if (val == null) return '—'
  return `${Number(val).toFixed(1)}°C`
}
function fmtCurrency(val) {
  if (val == null) return '—'
  return `RM ${Number(val).toLocaleString('en-MY', { minimumFractionDigits:2, maximumFractionDigits:2 })}`
}
function nowMYT() {
  const d = new Date()
  const myt = new Date(d.getTime() + 8 * 3600 * 1000)
  return myt.toISOString().replace('Z', '+08:00')
}
function randomTemp() {
  return parseFloat((3.8 + Math.random() * 1.0).toFixed(1))
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[status] || 'bg-gray-100 text-gray-600'}`}>
      {STATUS_LABEL[status] || status}
    </span>
  )
}

function StatCard({ label, value, color, small }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${small ? 'p-3' : 'p-5'}`}>
      <p className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>{label}</p>
      <p className={`font-bold mt-1 ${color} ${small ? 'text-2xl' : 'text-3xl'}`}>{value ?? '—'}</p>
    </div>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 my-auto" onClick={e => e.stopPropagation()}>
        <h2 className="font-semibold text-gray-900 text-lg">{title}</h2>
        {children}
      </div>
    </div>
  )
}

function SortableHeader({ sortKey, label, sortConfig, handleSort }) {
  const idx = sortConfig.findIndex(s => s.key === sortKey)
  const entry = idx !== -1 ? sortConfig[idx] : null
  const showPriority = sortConfig.length > 1 && idx !== -1
  return (
    <th className="px-4 py-3 cursor-pointer select-none hover:bg-gray-50" onClick={() => handleSort(sortKey)}>
      <span className="inline-flex items-center gap-1">
        {label}
        <span className={entry ? 'text-blue-500' : 'text-gray-300'}>
          {entry ? (entry.direction === 'asc' ? '↑' : '↓') : '⇅'}
        </span>
        {showPriority && <sup className="text-[10px] text-blue-400 font-bold leading-none">{idx + 1}</sup>}
      </span>
    </th>
  )
}

function Pagination({ currentPage, totalPages, perPage, totalItems, onPageChange, onPerPageChange }) {
  if (!totalItems) return null
  const from = (currentPage - 1) * perPage + 1
  const to = Math.min(currentPage * perPage, totalItems)
  const btnBase = 'px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed'
  const pageBtn = 'w-9 h-9 text-sm rounded-lg font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer'
  const pageBtnActive = 'w-9 h-9 text-sm rounded-lg font-medium bg-blue-600 text-white border-blue-600 cursor-pointer'
  const pages = totalPages <= 5
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : [1, ...(currentPage > 3 ? ['...'] : []), ...Array.from({ length: 3 }, (_, i) => currentPage - 1 + i).filter(p => p > 1 && p < totalPages), ...(currentPage < totalPages - 2 ? ['...'] : []), totalPages]
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-2">
      <p className="text-xs text-gray-400 whitespace-nowrap">Showing {from}–{to} of {totalItems}</p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={btnBase}>Previous</button>
        {[...new Set(pages)].map((p, i) =>
          p === '...' ? <span key={`e${i}`} className="w-9 text-center text-sm text-gray-400">…</span>
            : <button key={p} onClick={() => onPageChange(p)} className={p === currentPage ? pageBtnActive : pageBtn}>{p}</button>
        )}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={btnBase}>Next</button>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <label className="text-xs text-gray-400">Rows per page</label>
        <select value={perPage} onChange={e => onPerPageChange(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  )
}

function useSort(data) {
  const [sortConfig, setSortConfig] = useState([])
  function handleSort(key) {
    setSortConfig(prev => {
      const idx = prev.findIndex(s => s.key === key)
      if (idx === -1) return [{ key, direction: 'asc' }]
      if (prev[idx].direction === 'asc') return prev.map((s, i) => i === idx ? { ...s, direction: 'desc' } : s)
      return prev.filter((_, i) => i !== idx)
    })
  }
  const sortedData = [...(data || [])].sort((a, b) => {
    for (const { key, direction } of sortConfig) {
      const av = a[key], bv = b[key]
      if (av == null && bv == null) continue
      if (av == null) return 1
      if (bv == null) return -1
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
      if (cmp !== 0) return direction === 'asc' ? cmp : -cmp
    }
    return 0
  })
  return { sortedData, sortConfig, handleSort }
}

function usePagination(data, defaultPerPage = 25) {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(defaultPerPage)
  const totalItems = (data || []).length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedData = (data || []).slice((safePage - 1) * perPage, safePage * perPage)
  function goToPage(p) { setCurrentPage(Math.max(1, Math.min(p, totalPages))) }
  function handlePerPageChange(n) { setPerPage(n); setCurrentPage(1) }
  return { paginatedData, currentPage: safePage, totalPages, totalItems, perPage, setPerPage: handlePerPageChange, goToPage }
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR / LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

const TOP_NAV = [
  { key:'dashboard', label:'Dashboard', icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
]
const MANAGE_NAV = [
  { key:'warehouses',    label:'Warehouses',    icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { key:'customers',     label:'Customers',     icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { key:'outlets',       label:'Outlets',       icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { key:'products',      label:'Products',      icon:'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { key:'trucks',        label:'Trucks',        icon:'M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM1 3h12v11H1V3zm12 2.5h4l3 4V15h-7V5.5z' },
  { key:'drivers',       label:'Drivers',       icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { key:'public-holidays', label:'Public Holidays', icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
]
const BOTTOM_NAV = [
  { key:'invoices',            label:'Invoices',            icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key:'deliveries',          label:'Deliveries',          icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { key:'returned-deliveries', label:'Returned Deliveries', icon:'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' },
  { key:'reports',             label:'Reports',             icon:'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key:'warehouse-picking',   label:'Warehouse Picking',   icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
]

function NavIcon({ d }) {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
    </svg>
  )
}

function Layout({ page, setPage, returnedCount, children }) {
  const [open, setOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)

  const NavItem = ({ navKey, label, icon, badge }) => (
    <button
      onClick={() => { setPage(navKey); setOpen(false) }}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
        page === navKey ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <NavIcon d={icon} />
      {label}
      {badge > 0 && (
        <span className="ml-auto min-w-[1.25rem] h-5 px-1 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )

  const sidebarContent = (
    <>
      <div className="px-4 py-5 border-b border-gray-100">
        <span className="font-bold text-gray-900 text-base">Client A</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {TOP_NAV.map(item => <NavItem key={item.key} navKey={item.key} label={item.label} icon={item.icon} />)}

        <button
          onClick={() => setManageOpen(v => !v)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="flex-1 text-left">Manage</span>
          <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${manageOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {manageOpen && (
          <div className="pl-4 space-y-1">
            {MANAGE_NAV.map(item => <NavItem key={item.key} navKey={item.key} label={item.label} icon={item.icon} />)}
          </div>
        )}

        {BOTTOM_NAV.map(item => (
          <NavItem key={item.key} navKey={item.key} label={item.label} icon={item.icon}
            badge={item.key === 'returned-deliveries' ? returnedCount : undefined} />
        ))}
      </nav>
      <div className="px-3 pb-4">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:flex md:flex-col md:w-56 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-20" style={{top:'36px'}}>
        {sidebarContent}
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="relative w-64 h-full bg-white flex flex-col shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        <header className="md:hidden sticky top-9 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="p-1 text-gray-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-gray-900">Client A</span>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

function Dashboard({ deliveries }) {
  const [from, setFrom] = useState(TODAY)
  const [to, setTo]     = useState(TODAY)

  function shiftDay(delta) {
    const shift = iso => {
      const dt = new Date(iso + 'T00:00:00')
      dt.setDate(dt.getDate() + delta)
      return dt.toISOString().slice(0, 10)
    }
    setFrom(f => shift(f))
    setTo(t => shift(t))
  }
  function resetToday() { setFrom(TODAY); setTo(TODAY) }

  function rangeLabel() {
    if (from === TODAY && to === TODAY) return 'TODAY'
    const [,fm,fd] = from.split('-').map(Number)
    const [ty,tm,td] = to.split('-').map(Number)
    const p = n => String(n).padStart(2,'0')
    return `${p(fd)} ${MONTHS[fm-1]} – ${p(td)} ${MONTHS[tm-1]} ${ty}`
  }

  // Compute stats from live deliveries state
  const stats = {
    today_picking:          deliveries.filter(d => d.status === 'picking').length,
    today_partially_picked: deliveries.filter(d => d.status === 'partially_picked').length,
    today_pending:          deliveries.filter(d => d.status === 'pending').length,
    today_out:              deliveries.filter(d => d.status === 'out_for_delivery').length,
    today_delivered:        deliveries.filter(d => d.status === 'delivered').length,
    today_returned:         deliveries.filter(d => d.status === 'returned').length,
    today_returned_processed: deliveries.filter(d => d.status === 'returned_processed').length,
    today_total:            deliveries.length,
  }

  // Per-truck stats from live deliveries
  const byTruck = TRUCK_FLEET.map(truck => {
    const rows = deliveries.filter(d => d.truck_id === truck.id)
    return {
      truck_name:        truck.name,
      picking:           rows.filter(d => d.status === 'picking').length,
      partially_picked:  rows.filter(d => d.status === 'partially_picked').length,
      pending:           rows.filter(d => d.status === 'pending').length,
      out_for_delivery:  rows.filter(d => d.status === 'out_for_delivery').length,
      delivered:         rows.filter(d => d.status === 'delivered').length,
      returned:          rows.filter(d => d.status === 'returned').length,
      returned_processed:rows.filter(d => d.status === 'returned_processed').length,
      total:             rows.length,
    }
  })

  // Fleet progress uses spec numbers for total/done; delivered from live state
  const fleetProgress = TRUCK_FLEET.map(truck => {
    const liveDelivered = deliveries.filter(d => d.truck_id === truck.id && d.status === 'delivered').length
    const liveOut       = deliveries.filter(d => d.truck_id === truck.id && d.status === 'out_for_delivery').length
    return { ...truck, liveDelivered, liveOut }
  })

  // Recent activity — last 8 delivered
  const recentActivity = deliveries
    .filter(d => d.status === 'delivered' && d.submitted_at)
    .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
    .slice(0, 8)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

      {/* Date range */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 font-medium">From</label>
          <input type="date" value={from} max={to} onChange={e => setFrom(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 font-medium">To</label>
          <input type="date" value={to} min={from} onChange={e => setTo(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => shiftDay(-1)} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">←</button>
          <button onClick={resetToday}         className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">Today</button>
          <button onClick={() => shiftDay(1)}  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">→</button>
        </div>
      </div>

      {/* Overall KPI */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{rangeLabel()}</p>
        <div className="space-y-2 mb-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Picking"          value={stats.today_picking}          color="text-red-700"    small />
            <StatCard label="Partially Picked" value={stats.today_partially_picked} color="text-amber-300"  small />
            <StatCard label="Pending"          value={stats.today_pending}          color="text-yellow-600" small />
            <StatCard label="Out for Delivery" value={stats.today_out}              color="text-blue-600"   small />
          </div>
          <hr className="border-gray-100" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Delivered"          value={stats.today_delivered}          color="text-green-600"  small />
            <StatCard label="Returned"           value={stats.today_returned}           color="text-orange-500" small />
            <StatCard label="Returned Processed" value={stats.today_returned_processed} color="text-slate-400"  small />
            <StatCard label="Total"              value={stats.today_total}              color="text-gray-900"   small />
          </div>
        </div>
      </div>

      {/* Fleet Progress */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">FLEET PROGRESS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fleetProgress.map(truck => {
            const pct = truck.total > 0 ? Math.round((truck.liveDelivered / truck.total) * 100) : 0
            return (
              <div key={truck.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-900">{truck.name}</span>
                  <span className="text-xs text-gray-500">{truck.liveDelivered}/{truck.total}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{truck.driver} · {truck.area}</p>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                  {truck.liveOut > 0 && <span className="text-blue-600 font-medium">{truck.liveOut} en route</span>}
                  <span>{pct}% complete</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* By Truck KPI */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">By Truck</p>
        <div className="space-y-4">
          {byTruck.map(d => (
            <div key={d.truck_name}>
              <p className="text-sm font-semibold text-gray-700 mb-2">{d.truck_name}</p>
              <div className="space-y-2 mb-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Picking"          value={d.picking}          color="text-red-700"    small />
                  <StatCard label="Partially Picked" value={d.partially_picked} color="text-amber-300"  small />
                  <StatCard label="Pending"          value={d.pending}          color="text-yellow-600" small />
                  <StatCard label="Out for Delivery" value={d.out_for_delivery} color="text-blue-600"   small />
                </div>
                <hr className="border-gray-100" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Delivered"          value={d.delivered}           color="text-green-600"  small />
                  <StatCard label="Returned"           value={d.returned}            color="text-orange-500" small />
                  <StatCard label="Returned Processed" value={d.returned_processed}  color="text-slate-400"  small />
                  <StatCard label="Total"              value={d.total}               color="text-gray-900"   small />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      {recentActivity.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">RECENT ACTIVITY</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {recentActivity.map(d => (
              <div key={d.id} className="flex items-center justify-between px-4 py-3 gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{d.outlet_name}</p>
                  <p className="text-xs text-gray-400">{d.truck_name} · {d.driver_name}</p>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge status={d.status} />
                  {d.submitted_at && (
                    <p className="text-xs text-gray-400 mt-0.5">{fmtDate(d.submitted_at)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DELIVERY DETAIL MODAL
// ─────────────────────────────────────────────────────────────────────────────

function DeliveryDetailModal({ delivery, onClose, onSave }) {
  const [editStatus, setEditStatus] = useState(delivery.status)
  const [editRemark, setEditRemark] = useState(delivery.remark || '')
  const [saving, setSaving] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      onSave({ ...delivery, status: editStatus, remark: editRemark || null })
      setSaving(false)
      onClose()
    }, 400)
  }

  const invoices = INVOICES.filter(inv => inv.invoice_number === delivery.invoice_numbers)

  const Section = ({ title, children }) => (
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 text-sm mb-3">{title}</h3>
      {children}
    </div>
  )

  const Field = ({ label, value }) => (
    <div className="min-w-0">
      <dt className="text-xs text-gray-400 mb-0.5">{label}</dt>
      <dd className="text-sm text-gray-900 break-words">{value || '—'}</dd>
    </div>
  )

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 space-y-4 my-4" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-gray-900 flex-1">{delivery.outlet_name}</h2>
          <StatusBadge status={delivery.status} />
        </div>

        {/* Details */}
        <Section title="Delivery Details">
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Customer"          value={delivery.customer_name} />
            <Field label="Outlet"            value={delivery.outlet_name} />
            <Field label="Address"           value={delivery.outlet_address} />
            <Field label="Truck"             value={delivery.truck_name} />
            <Field label="Driver"            value={delivery.driver_name} />
            <Field label="Assistant"         value={delivery.assistant_name} />
            <Field label="Delivery Date"     value={fmtDateOnly(delivery.delivery_date)} />
            <Field label="Time Spent"        value={fmtTime(delivery.time_spent_seconds)} />
            <Field label="Truck Temperature" value={fmtTemp(delivery.temperature)} />
            <Field label="Arrived At"        value={fmtDate(delivery.arrived_at)} />
            <Field label="Submitted At"      value={fmtDate(delivery.submitted_at)} />
          </dl>
        </Section>

        {/* Editable fields */}
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={editStatus} onChange={e => setEditStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
            <textarea value={editRemark} onChange={e => setEditRemark(e.target.value)} rows={2}
              placeholder="Add a remark…"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl disabled:opacity-50 hover:bg-blue-700">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <button type="button" onClick={onClose} className="px-5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </form>

        {/* Invoices */}
        <Section title={`Invoices (${invoices.length})`}>
          {invoices.length === 0
            ? <p className="text-sm text-gray-400">No invoices</p>
            : invoices.map(inv => (
              <div key={inv.id} className="bg-white rounded-xl p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">#{inv.invoice_number}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Confirmed</span>
                </div>
                <div className="space-y-0.5">
                  {(inv.products || []).slice(0, 5).map((item, i) => (
                    <p key={i} className="text-xs text-gray-500">
                      {item.product_name} × {item.quantity} {item.uom}
                    </p>
                  ))}
                  {(inv.products || []).length > 5 && (
                    <p className="text-xs text-gray-400">+{inv.products.length - 5} more items</p>
                  )}
                </div>
              </div>
            ))
          }
        </Section>

        {/* Photos */}
        {['before', 'after', 'grn'].map(phase => (
          <Section key={phase} title={`${phase === 'before' ? 'Before Delivery' : phase === 'after' ? 'After Delivery' : 'GRN'} (${delivery.photo ? 2 : 0})`}>
            {!delivery.photo
              ? <p className="text-sm text-gray-400">No photos</p>
              : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[1,2].map(n => (
                    <div key={n} className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-8 h-8 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-gray-300 mt-1">Photo {n}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </Section>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DELIVERIES PAGE
// ─────────────────────────────────────────────────────────────────────────────

export function DeliveriesPage({ deliveries, setDeliveries, openDetail }) {
  const [filters, setFilters] = useState({ date_from: TODAY, date_to: TODAY, truck_id: '', status: '', invoice_number: '' })

  function goToday() { setFilters(f => ({ ...f, date_from: TODAY, date_to: TODAY })) }
  function shiftDay(delta) {
    const shift = iso => {
      const dt = new Date((iso || TODAY) + 'T00:00:00')
      dt.setDate(dt.getDate() + delta)
      return dt.toISOString().slice(0, 10)
    }
    setFilters(f => ({ ...f, date_from: shift(f.date_from), date_to: shift(f.date_to) }))
  }

  const filtered = deliveries.filter(d => {
    if (filters.truck_id  && d.truck_id  !== filters.truck_id)  return false
    if (filters.status    && d.status    !== filters.status)    return false
    if (filters.invoice_number && !d.invoice_numbers.toLowerCase().includes(filters.invoice_number.toLowerCase())) return false
    return true
  })

  const { sortedData, sortConfig, handleSort } = useSort(filtered)
  const { paginatedData, currentPage, totalPages, totalItems, perPage, setPerPage, goToPage } = usePagination(sortedData)

  const selCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
  const pageTotal = paginatedData.reduce((s, d) => s + (Number(d.total_sales_amount) || 0), 0)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Deliveries</h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:flex-wrap gap-3 md:items-end">
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <input type="date" value={filters.date_from} onChange={e => setFilters(f => ({ ...f, date_from: e.target.value }))} className={selCls} />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <input type="date" value={filters.date_to} onChange={e => setFilters(f => ({ ...f, date_to: e.target.value }))} className={selCls} />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">Truck</label>
          <select value={filters.truck_id} onChange={e => setFilters(f => ({ ...f, truck_id: e.target.value }))} className={selCls}>
            <option value="">All trucks</option>
            {TRUCK_FLEET.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className={selCls}>
            <option value="">All</option>
            <option value="unassigned">Unassigned</option>
            <option value="picking">Picking</option>
            <option value="partially_picked">Partially Picked</option>
            <option value="pending">Pending</option>
            <option value="out_for_delivery">Out for delivery</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
            <option value="returned_processed">Returned Processed</option>
          </select>
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">Invoice Number</label>
          <input type="text" value={filters.invoice_number} placeholder="e.g. INV-2024"
            onChange={e => setFilters(f => ({ ...f, invoice_number: e.target.value }))} className={selCls} />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-1 w-full md:w-auto">
            <button onClick={() => shiftDay(-1)} className="flex-1 md:flex-none min-h-[44px] bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">←</button>
            <button onClick={goToday}            className="flex-1 md:flex-none min-h-[44px] bg-blue-50 text-blue-700 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-100 transition-colors">Today</button>
            <button onClick={() => shiftDay(1)}  className="flex-1 md:flex-none min-h-[44px] bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">→</button>
          </div>
          <button onClick={() => setFilters({ date_from: TODAY, date_to: TODAY, truck_id: '', status: '', invoice_number: '' })}
            className="w-full md:w-auto min-h-[44px] text-gray-500 text-sm px-3 py-2 rounded-lg hover:bg-gray-100">
            Clear
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400">{totalItems} result{totalItems !== 1 ? 's' : ''}</p>

      {/* Desktop table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400 font-medium">
                <SortableHeader sortKey="outlet_name"        label="Outlet"         sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="truck_name"         label="Truck"          sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="driver_name"        label="Driver"         sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="assistant_name"     label="Assistant"      sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="status"             label="Status"         sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="invoice_numbers"    label="Invoices"       sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="total_sales_amount" label="Total Sales"    sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="time_spent_seconds" label="Time Spent"     sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="delivery_date"      label="Delivery Date"  sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="warehouse_distance" label="Distance (km)"  sortConfig={sortConfig} handleSort={handleSort} />
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map(d => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <button onClick={() => openDetail(d)} className="hover:text-blue-600 text-left">{d.outlet_name}</button>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{d.truck_name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{d.driver_name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{d.assistant_name ?? '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-gray-500">
                    {d.invoice_numbers ? d.invoice_numbers.split('|').map((n, i) => <div key={i}>{n}</div>) : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{fmtCurrency(d.total_sales_amount)}</td>
                  <td className="px-4 py-3 text-gray-500">{fmtTime(d.time_spent_seconds)}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{fmtDateOnly(d.delivery_date)}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {d.warehouse_distance != null ? Number(d.warehouse_distance).toFixed(3) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openDetail(d)} className="text-xs text-blue-600 hover:text-blue-800 font-medium">View</button>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr><td colSpan={11} className="px-4 py-8 text-center text-gray-400 text-sm">No deliveries found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end px-4 py-3 border-t border-gray-100 text-sm font-semibold text-gray-700">
          Page Total: RM {pageTotal.toLocaleString('en-MY', { minimumFractionDigits:2, maximumFractionDigits:2 })}
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} perPage={perPage} totalItems={totalItems}
        onPageChange={goToPage} onPerPageChange={setPerPage} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// INVOICES PAGE
// ─────────────────────────────────────────────────────────────────────────────

function InvoicesPage({ deliveries }) {
  const [filters, setFilters] = useState({ date_from: TODAY, date_to: TODAY, truck_id: '', invoice_number: '' })
  const [expanded, setExpanded] = useState(null)

  const liveInvoices = INVOICES.map(inv => {
    const d = deliveries.find(d => d.invoice_numbers === inv.invoice_number)
    return { ...inv, amount: d ? d.total_sales_amount : inv.amount, truck_name: d ? d.truck_name : inv.truck_name }
  })

  const filtered = liveInvoices.filter(inv => {
    if (filters.truck_id && !INITIAL_DELIVERIES.find(d => d.invoice_numbers === inv.invoice_number && d.truck_id === filters.truck_id)) return false
    if (filters.invoice_number && !inv.invoice_number.toLowerCase().includes(filters.invoice_number.toLowerCase())) return false
    return true
  })

  const { sortedData, sortConfig, handleSort } = useSort(filtered)
  const { paginatedData, currentPage, totalPages, totalItems, perPage, setPerPage, goToPage } = usePagination(sortedData)

  const selCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
  const pageTotal = paginatedData.reduce((s, inv) => s + (Number(inv.amount) || 0), 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">Invoices</h1>
        <button className="min-h-[44px] bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Pull Invoices
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:flex-wrap gap-3 md:items-end">
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <input type="date" value={filters.date_from} onChange={e => setFilters(f => ({ ...f, date_from: e.target.value }))} className={selCls} />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <input type="date" value={filters.date_to} onChange={e => setFilters(f => ({ ...f, date_to: e.target.value }))} className={selCls} />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">Truck</label>
          <select value={filters.truck_id} onChange={e => setFilters(f => ({ ...f, truck_id: e.target.value }))} className={selCls}>
            <option value="">All trucks</option>
            {TRUCK_FLEET.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-xs text-gray-500 mb-1">Invoice Number</label>
          <input type="text" value={filters.invoice_number} placeholder="e.g. INV-2024"
            onChange={e => setFilters(f => ({ ...f, invoice_number: e.target.value }))} className={selCls} />
        </div>
        <button onClick={() => setFilters({ date_from: TODAY, date_to: TODAY, truck_id: '', invoice_number: '' })}
          className="w-full md:w-auto min-h-[44px] text-gray-500 text-sm px-3 py-2 rounded-lg hover:bg-gray-100">Clear</button>
      </div>

      <p className="text-xs text-gray-400">{totalItems} result{totalItems !== 1 ? 's' : ''}</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400 font-medium">
                <SortableHeader sortKey="invoice_number" label="Invoice #"     sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="customer_name"  label="Customer"      sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="outlet_name"    label="Outlet"        sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="invoice_date"   label="Invoice Date"  sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="products"       label="Items"         sortConfig={sortConfig} handleSort={handleSort} />
                <th className="px-4 py-3">Deliveries</th>
                <SortableHeader sortKey="truck_name"           label="Truck"         sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="amount"               label="Amount (RM)"   sortConfig={sortConfig} handleSort={handleSort} />
                <SortableHeader sortKey="warehouse_distance"   label="Distance (km)" sortConfig={sortConfig} handleSort={handleSort} />
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map(inv => (
                <React.Fragment key={inv.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-gray-900">{inv.invoice_number}</td>
                    <td className="px-4 py-3 text-gray-500">{inv.customer_name}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.outlet_name}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{fmtDateOnly(inv.invoice_date)}</td>
                    <td className="px-4 py-3">
                      {inv.products?.length > 0 && (
                        <button onClick={() => setExpanded(expanded === inv.id ? null : inv.id)}
                          className="text-xs text-blue-600 hover:underline">
                          {inv.products.length} item{inv.products.length !== 1 ? 's' : ''}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {inv.deliveries?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {inv.deliveries.map(d => (
                            <span key={d.delivery_id} className="text-xs text-blue-600">{fmtDateOnly(d.delivery_date)}</span>
                          ))}
                        </div>
                      ) : <span className="text-xs text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{inv.truck_name ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {inv.amount != null ? `RM ${Number(inv.amount).toFixed(2)}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {inv.warehouse_distance != null ? Number(inv.warehouse_distance).toFixed(3) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-end">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                        <button className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                  {expanded === inv.id && (
                    <tr className="bg-blue-50">
                      <td colSpan={10} className="px-6 py-3">
                        <div className="flex flex-wrap gap-3">
                          {inv.products.map((item, i) => (
                            <span key={i} className="text-xs bg-white border border-blue-100 rounded-lg px-3 py-1.5 text-gray-700">
                              <span className="font-medium">{item.product_name}</span>
                              <span className="text-gray-400 ml-1.5">×{item.quantity} {item.uom}</span>
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {paginatedData.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-400 text-sm">No invoices found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end px-4 py-3 border-t border-gray-100 text-sm font-semibold text-gray-700">
          Page Total: RM {pageTotal.toFixed(2)}
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} perPage={perPage} totalItems={totalItems}
        onPageChange={goToPage} onPerPageChange={setPerPage} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WAREHOUSE PICKING PAGE
// ─────────────────────────────────────────────────────────────────────────────

function WarehousePickingPage() {
  const [role, setRole] = useState('picker1')
  const [pickings, setPickings] = useState(PICKING_RECORDS)
  const [checkedMap, setCheckedMap] = useState(() => {
    const m = {}
    PICKING_RECORDS.forEach(pk => pk.items.forEach(it => { m[it.id] = it.is_picked }))
    return m
  })
  const [hasNewItems, setHasNewItems] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  function toggleCheck(id) {
    setCheckedMap(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Group all items by truck
  const allItems = pickings.flatMap(pk => pk.items)
  const visibleItems = role === 'picker2' ? allItems.filter(i => i.is_picked) : allItems

  const groups = (() => {
    const map = new Map()
    for (const item of visibleItems) {
      if (!map.has(item.truck_name)) map.set(item.truck_name, [])
      map.get(item.truck_name).push(item)
    }
    return Array.from(map.entries()).map(([heading, rows]) => ({ heading, rows }))
  })()

  function handleSubmit() {
    setSuccessMsg(role === 'picker2' ? 'Pickings reviewed and ready for delivery!' : 'Picking submitted!')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  return (
    <div className="space-y-0 -m-4 md:-m-6">
      {/* Violet header */}
      <header className="bg-violet-600 text-white px-4 py-4 flex items-center justify-between shadow-md sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Warehouse Picking</h1>
          <p className="text-xs text-violet-300 mt-0.5 capitalize">{role}</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={role} onChange={e => setRole(e.target.value)}
            className="text-xs bg-violet-500 text-white border border-violet-400 rounded-lg px-2 py-1 focus:outline-none">
            <option value="picker1">Picker 1</option>
            <option value="picker2">Picker 2 (Reviewer)</option>
          </select>
        </div>
      </header>

      {/* New items banner (picker2) */}
      {role === 'picker2' && hasNewItems && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 flex items-center justify-between">
          <span className="text-blue-800 text-sm font-medium">New items are ready for review — tap to refresh.</span>
          <button onClick={() => setHasNewItems(false)} className="text-blue-700 text-sm font-semibold ml-3">Refresh</button>
        </div>
      )}

      {/* Push notification demo banner */}
      <div className="bg-violet-50 border-b border-violet-100 px-4 py-2 flex items-center gap-2">
        <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="text-xs text-violet-700 font-medium">Push notifications enabled — Picker 2 will be alerted when picking is ready for review</span>
      </div>

      {successMsg && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-3 flex items-center justify-between">
          <span className="text-green-800 text-sm font-medium">{successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="text-green-600 text-lg leading-none">×</button>
        </div>
      )}

      {/* Picking summary cards */}
      <div className="px-4 pt-4 pb-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PICKING_RECORDS.map(pk => (
          <div key={pk.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">{pk.truck_name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pk.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {pk.status === 'reviewed' ? 'Reviewed' : 'Picked'}
              </span>
            </div>
            <p className="text-xs text-gray-500">Picker: {pk.picker}</p>
            <p className="text-xs text-gray-500">Reviewer: {pk.reviewer ?? <span className="text-gray-300">—</span>}</p>
            <p className="text-xs text-gray-400 mt-1">Started: {pk.started}</p>
          </div>
        ))}
      </div>

      {/* Sort controls */}
      <div className="px-4 py-2 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 font-medium">Sort within truck:</span>
        <button className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-violet-600 text-white flex items-center gap-1">Type ↑</button>
        <button className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-white border border-gray-200 text-gray-600">Name</button>
      </div>

      {/* Item groups */}
      <div className="space-y-4 px-4 pb-10">
        {groups.map(({ heading, rows }) => (
          <div key={heading}>
            <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1.5 px-1">{heading}</p>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
              {rows.map(item => {
                const checked = Boolean(checkedMap[item.id])
                return (
                  <div key={item.id} className={`flex items-center gap-3 px-4 py-3.5 transition-colors ${checked ? 'bg-green-50' : 'bg-white'}`}>
                    <button
                      onClick={() => toggleCheck(item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                        checked ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-violet-400'
                      }`}
                    >
                      {checked && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm ${checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>{item.display_name}</div>
                      <div className={`text-xs ${checked ? 'line-through text-gray-400' : 'text-gray-500'}`}>
                        {[item.product_type, item.product_code].filter(Boolean).join(' · ')}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`font-bold text-sm ${checked ? 'text-gray-400' : 'text-gray-800'}`}>×{item.total_quantity}</div>
                      <div className={`text-xs ${checked ? 'line-through text-gray-400' : 'text-gray-500'}`}>
                        {Object.entries(item.uom_summary).map(([u,q]) => `${u}: ${q}`).join(' · ')}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="mt-4">
          <button onClick={handleSubmit}
            className="w-full bg-violet-600 text-white font-semibold py-3.5 rounded-xl hover:bg-violet-700 active:bg-violet-800 transition-colors text-sm">
            {role === 'picker2' ? 'Complete Picking Review' : 'Submit Picking for Review'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STUB PAGES
// ─────────────────────────────────────────────────────────────────────────────

function StubPage({ title, description }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-gray-400 text-sm font-medium">{description || `${title} management`}</p>
        <p className="text-gray-300 text-xs mt-1">This screen is available in the full system</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function FleetOpsDemo() {
  const [page, setPage] = useState('dashboard')
  const [deliveries, setDeliveries] = useState(INITIAL_DELIVERIES)
  const [detailDelivery, setDetailDelivery] = useState(null)
  const [simCount, setSimCount] = useState(0)
  const simRef = useRef(null)

  // Live simulation: every 20s, advance one out_for_delivery → delivered
  useEffect(() => {
    simRef.current = setInterval(() => {
      setDeliveries(prev => {
        const outItems = prev.filter(d => d.status === 'out_for_delivery')
        if (outItems.length === 0) return prev
        const target = outItems[0]
        const now = nowMYT()
        const temp = randomTemp()
        const arrivedISO = new Date(new Date(now).getTime() - (5 + Math.floor(Math.random() * 15)) * 60 * 1000).toISOString().replace('Z', '+08:00')
        setSimCount(c => c + 1)
        return prev.map(d => d.id === target.id ? {
          ...d,
          status:             'delivered',
          temperature:        temp,
          submitted_at:       now,
          arrived_at:         arrivedISO,
          time_spent_seconds: Math.round((new Date(now) - new Date(arrivedISO)) / 1000),
          photo:              true,
        } : d)
      })
    }, 20000)
    return () => clearInterval(simRef.current)
  }, [])

  function handleSaveDelivery(updated) {
    setDeliveries(prev => prev.map(d => d.id === updated.id ? updated : d))
    setDetailDelivery(null)
  }

  function openDetail(d) {
    setDetailDelivery(d)
  }

  // Get current delivery from live state (in case simulation updated it)
  const liveDetailDelivery = detailDelivery
    ? deliveries.find(d => d.id === detailDelivery.id) || detailDelivery
    : null

  const returnedCount = deliveries.filter(d => d.status === 'returned').length

  function renderPage() {
    switch (page) {
      case 'dashboard':          return <Dashboard deliveries={deliveries} />
      case 'deliveries':         return <DeliveriesPage deliveries={deliveries} setDeliveries={setDeliveries} openDetail={openDetail} />
      case 'invoices':           return <InvoicesPage deliveries={deliveries} />
      case 'warehouse-picking':  return <WarehousePickingPage />
      case 'returned-deliveries':return <DeliveriesPage deliveries={deliveries.filter(d => d.status === 'returned' || d.status === 'returned_processed')} setDeliveries={setDeliveries} openDetail={openDetail} />
      case 'trucks':             return <StubPage title="Trucks" />
      case 'drivers':            return <StubPage title="Drivers" />
      case 'warehouses':         return <StubPage title="Warehouses" />
      case 'customers':          return <StubPage title="Customers" />
      case 'outlets':            return <StubPage title="Outlets" />
      case 'products':           return <StubPage title="Products" />
      case 'public-holidays':    return <StubPage title="Public Holidays" />
      case 'reports':            return <StubPage title="Reports" />
      default:                   return <Dashboard deliveries={deliveries} />
    }
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      {/* Demo banner */}
      <div
        style={{ background: '#1e3a5f', position: 'sticky', top: 0, zIndex: 50, height: '36px' }}
        className="w-full text-white text-center text-xs font-medium flex items-center justify-center gap-3"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          DEMO MODE — Sample data only | Client A Fleet Operations
        </span>
        {simCount > 0 && (
          <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full text-[10px]">
            {simCount} auto-delivered
          </span>
        )}
      </div>

      <Layout page={page} setPage={setPage} returnedCount={returnedCount}>
        {renderPage()}
      </Layout>

      {liveDetailDelivery && (
        <DeliveryDetailModal
          delivery={liveDetailDelivery}
          onClose={() => setDetailDelivery(null)}
          onSave={handleSaveDelivery}
        />
      )}
    </div>
  )
}
