import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigations/AppNavigation";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("BASEBASEBASE_2.db");

export default class App extends React.Component {
  constructor() {
    super();
    console.log("app6.js");
    //tabla de inversiones
    db.transaction((tx) => {
        tx.executeSql("drop table inversiones;" );
      tx.executeSql(
        "create table if not exists inversiones (id_inversion integer primary key not null, tipo text, flag_deposito text, monto real, rendimiento real, vencimiento text, cuenta text, dia int, mes int, anio int, sem int, user text);"
      );
      
    });
    //Tabla de movimientos
    db.transaction((tx) => {
       tx.executeSql("drop table movimientos;"
      ); 
      tx.executeSql(
        "create table if not exists movimientos (id_movimiento integer primary key not null, fecha text, detalle text, monto int, medio text, tipo_mov text, comprobante text, dia int, mes int, anio int, sem int, user text);"
      );
    });

    //Tabla de usuarios
    db.transaction((tx) => {
      console.log("creo tabla usuarios")
       /* tx.executeSql(
        "drop table usuarios ;"
      );  */ 
      tx.executeSql(
        "create table if not exists usuarios (id_usuario integer primary key not null, mail text, pass text, logueado integer);"
      );
    });



    /* //Tabla de cuentas
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cuentas (id_cuenta integer primary key not null, banco text, numero text, cbu int, debito text, saldo real);"
      );
    });
     
    //Tabla de tarjetas
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tarjetas (id_tarjeta integer primary key not null, banco text, entidad text, numero text, vencimiento text, cierre_resumen text, vencimiento_resumen text);"
      );
    }); */

    //Tabla de presupuestos
    db.transaction((tx) => {
      tx.executeSql("drop table presupuestos;" );
      tx.executeSql(
        "create table if not exists presupuestos (id_presupuestos integer primary key not null, mes integer, anio integer, rubro text, categoria text, monto real, user text);"
      );
    });

    //Tabla de medios
    db.transaction((tx) => {
      console.log("medio")
         tx.executeSql("drop table medios;" );
      tx.executeSql(
        "create table if not exists medios (id_medio integer primary key not null, banco text, numero text, cbu text, debito text, saldo real,entidad text, vencimiento text, cierre_resumen text, vencimiento_resumen text, esCuentaBancaria integer, esTarjetaCredito integer, esEfectivo integer, vencimientoResumenDia int, vencimientoResumenMes int, vencimientoResumenAnio int, vencimientoResumenSem int, user text);"
      );
      tx.executeSql(
        "insert into medios(banco , numero , cbu , debito , saldo ,entidad , vencimiento , cierre_resumen , vencimiento_resumen , esCuentaBancaria , esTarjetaCredito , esEfectivo, vencimientoResumenDia, vencimientoResumenMes, vencimientoResumenAnio, vencimientoResumenSem, user) VALUES(' ','Efectivo',' ',' ',0.0,' ',' ',' ',' ',0,0,1, ' ', ' ', ' ', ' ', '');"
      );
    }); 

    //Tabla de Prestamos
    db.transaction((tx) => {
        tx.executeSql("drop table prestamos;" );
      tx.executeSql(
        "create table if not exists prestamos (id_prestamo integer primary key not null, tipo text, monto real, cuenta text, cuotas integer, vencimiento text, dia int, mes int, anio int, sem int, user text);"
      );
    });

     /*db.transaction((tx) => {
      console.log("medio")
      tx.executeSql(
        "insert into medios(banco , numero , cbu , debito , saldo ,entidad , vencimiento , cierre_resumen , vencimiento_resumen , esCuentaBancaria , esTarjetaCredito , esEfectivo ) VALUES(' ','Efectivo',' ',' ',0.0,' ',' ',' ',' ',0,0,1);"
      );
    }); */
      /* db.transaction((tx) => {
      console.log("usuarios")
      tx.executeSql(
        "insert into usuarios(mail, pass, logueado ) VALUES('gero','1234',1);"
      );
    }); */ 
    db.transaction((tx) => { 
      tx.executeSql("select * from usuarios", [], (_, { rows }) => {
        console.log(rows);
        //setInversiones(rows._array);
      });
    });

    /* db.transaction((tx) => {
       tx.executeSql(
         "insert into inversiones ( tipo , flag_deposito , monto , rendimiento , vencimiento , cuenta ) values ('plazo fijo','debito en cuenta',125.10, 180.25, '30/09/2020', '805') ",
         [],
        (_, { rows }) => console.log("inv", JSON.stringify(rows))
      );
    }); */
  }

  render() {
    return <AppContainer></AppContainer>;
  }
}
