import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { BehaviorSubject, map, Observable, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-sede-admin',
  templateUrl: './sede-admin.component.html',
  styleUrls: ['./sede-admin.component.css']
  
})
export class SedeAdminComponent implements OnInit {

    constructor(
        protected dd: DataDefinitionToolService,
        protected storage: SessionStorageService,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar,
        protected router: Router, 
        protected route: ActivatedRoute, 
        protected fb: FormBuilder, 
        protected validators: DdAsyncValidatorsService,
        protected tools: ComponentToolsService,
    ) { }

    loadParams$!: Observable<any> //carga de parametros
    loadDisplay$!: Observable<any> //carga de display
    loadStorage$!: Observable<any> //carga de storage
    load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
    display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
    storageValues: any = null //valores del storage
    params: { [x: string]: any } = {} //parametros del componente

    controlSede:FormGroup = this.fb.group({
        id:this.fb.control(null),
        numero:this.fb.control(null,{ validators:[Validators.required] }),
        nombre:this.fb.control(null,{ validators:[Validators.required] }),
        centro_educativo:this.fb.control(null,{ validators:[Validators.required] }),
        observaciones:this.fb.control(null),
        domicilio:this.fb.control(null),
        organizacion:this.fb.control(null),
    })

    controlDomicilio:FormGroup = this.fb.group({
        id:this.fb.control(null),
        calle:this.fb.control(null,{ validators:[Validators.required] }),
        numero:this.fb.control(null,{ validators:[Validators.required] }),
        localidad:this.fb.control(null,{ validators:[Validators.required] }),
        entre:this.fb.control(null),
        piso:this.fb.control(null),
        departamento:this.fb.control(null),
        barrio:this.fb.control(null),
    })

    controlComision_:FormArray = this.fb.array([])

    controlDesignacion_:FormArray = this.fb.array([])


    control: FormGroup = this.fb.group({
        sede: this.controlSede,
        domicilio: this.controlDomicilio,
    })

    
    defaultValuesDomicilio: {[index:string]: any} = {
        localidad:"La Plata"
    }


    isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar
    protected subscriptions: Subscription = new Subscription() //suscripciones en el ts

    formGroupComision(data:{[i:string]:any} = {}): FormGroup {
        var fg = this.fb.group({
            "id":this.fb.control(""),
            "numero":this.fb.control(""),
            "tramo":this.fb.control(""),
            "horario":this.fb.control(""),
            "calendario-anio":this.fb.control(""),
            "calendario-semestre":this.fb.control(""),
            "apertura":this.fb.control(""),
            "autorizada":this.fb.control(""),
        })
        fg.patchValue(data)
        return fg;
    }


    formGroupDesignacion(data:{[i:string]:any} = {}): FormGroup {
        var fg = this.fb.group({
            "id":this.fb.control(""),
            "cargo-descripcion":this.fb.control(""),
            "persona-nombres":this.fb.control(""),
            "persona-apellidos":this.fb.control(""),
            "persona-telefono":this.fb.control(""),
            "persona-email":this.fb.control(""),
        })
        fg.patchValue(data)
        return fg;
    }

    ngOnInit(): void {
        this.loadParams()
        this.loadDisplay()
        this.loadStorage$ = this.tools.loadStorage(this.control)
    }

    loadParams(){
        this.loadParams$ = this.route.queryParams.pipe(
        map(
            queryParams => { 
                this.params = queryParams
                var display = new Display().setSize(100).setParamsByQueryParams(queryParams);
                this.display$.next(display)
                return true;
            },
        ),
        )
    }

    initData(): Observable<any> {
        var data = {
        "sede":{}, 
        "domicilio":{}, 
        }
        if(isEmptyObject(this.params)) return of(data)

        return this.dd.post("unique_id", "sede", this.params).pipe(
        switchMap(
            id => {
            if(!id) return of({})
            return this.dd.get("sede",id)
            }
        ),
        switchMap(
            (sede) => {
            if(isEmptyObject(sede)) return of(data)
            data["sede"] = sede
            return this.dd.mergeObjectGet_({
                data:data, 
                entity_name:"domicilio", 
                fields:["id","calle","numero","localidad","entre","piso","departamento","barrio"],
                id:"sede"
            }) 
            }
        ),
        
        )
    }

    initComision_(data: { [x: string]: any }): Observable<any> {
        data["comision/sede"] = [];

        if(isEmptyObject(data["sede"])) return of(data);

        var display = new Display()
        .setParams({"sede":data["sede"]["id"]})
        .setOrder({ "division":"ASC", "calendario-anio":"ASC", "calendario-semestre":"ASC"})

        return this.dd.post("ids", "comision", display).pipe(
        switchMap(
            (ids:string[]) => this.dd.entityFieldsGetAll({ 
            entity_name: "comision", 
            ids:ids, 
            fields:["id","apertura","autorizada","planificacion-anio","planificacion-semestre","plan-orientacion","division","calendario-anio","calendario-semestre"]
            }),
        ),
        switchMap(
            (data:{[index:string]:any}[]) => this.dd.postMergeAll({ 
            data, 
            method: "horarios", 
            entity_name: "comision", 
            fields: { "dias":"dias_dias", "hora_inicio":"hora_inicio","hora_fin":"hora_fin" }, 
            field_nameData: "id", field_nameResponse: "comision" 
            })
        ),
        map(
            (comision_: any) => {
            console.log(comision_)
            comision_.forEach((element: { [x: string]: string; }) => {
                element["numero"] = data["sede"]["numero"] + element["division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
                element["tramo"] = element["plan-orientacion"] + " " + element["planificacion-anio"] + "°" + element["planificacion-semestre"] + "c"
                if(element["dias"]) element["horario"] =  element["dias"] + " " + element["hora_inicio"] + " a " + element["hora_fin"]
                
            })
            data["comision/sede"] = comision_
            return data
            }
        )
        )
    }


    initDesignacion_(data: { [x: string]: any }): Observable<any> {
        data["designacion/sede"] = [];

        if(isEmptyObject(data["sede"])) return of(data);

        var display = new Display()
        .setParams({
            sede:data["sede"]["id"],
            hasta:false
        })

        return this.dd.post("ids", "designacion", display).pipe(
        switchMap(
            (ids:string[]) => this.dd.entityFieldsGetAll({ 
            entity_name: "designacion", 
            ids:ids, 
            fields:["id","cargo","persona-nombres","persona-apellidos","persona-email","persona-telefono","cargo-descripcion"]
            }),
        ),
        map(
            designacion_=>{
            data["designacion/sede"] = designacion_
            return data
            }
        )
        )
    }

    loadDisplay(){
        this.loadDisplay$ = this.display$.pipe(
        switchMap(
            () => {
            var storageValues = this.tools.initStorageValues()
            if(!isEmptyObject(storageValues)) return of(storageValues)
            else return this.initData();
            }
        ),
        switchMap(
            (data: any) => {
            console.log(data)

            return this.initComision_(data)
            }
        ),
        switchMap(
            (data: any) => {
            return this.initDesignacion_(data)
            }
        ),
        map(
            data => { 
            console.log(data)
            /**
             * Se utiliza pathValue para asignar los datos
             * pathValue solo define los datos existentes y deja intactos los no existentes
             * Siempre que corresponda es necesario seguir la siguiente secuencia de asignacion:
             * 1) limpieza  (reset o clear), 2) defecto, 3) parametros, 4) datos.
             */
            this.control.reset() //limpieza

            this.controlDomicilio.patchValue({...this.defaultValuesDomicilio, ...data["domicilio"]}) //defecto

            if(!isEmptyObject(this.params)) this.controlSede.patchValue({...this.params, ...data["sede"]}); //parametros

            this.controlComision_.clear(); //limpieza
            for(var i = 0; i <data["comision/sede"].length; i++) this.controlComision_.push(this.formGroupComision(data["comision/sede"][i])); //inicializacion

            this.controlDesignacion_.clear(); //limpieza
            for(var i = 0; i <data["designacion/sede"].length; i++) this.controlDesignacion_.push(this.formGroupDesignacion(data["designacion/sede"][i])); //inicializacion

            return true;
            },
        ),
        
        )
    }

    onSubmit(){
        this.isSubmitted = true;
        if (!this.control.valid) {
        this.tools.cancelSubmit(this.control)
        this.isSubmitted = false;
        } else {
        var serverData:{[index:string]:any} = this.control.value

        if(this.controlDomicilio.disabled && this.controlSede.get("domicilio")!.value) {
            serverData["domicilio"] = {id:this.controlSede.get("domicilio")!.value, _mode:"delete"}  
            this.controlSede.get("domicilio")!.setValue(null);
        }
    
        var s = this.dd._post("persist_rel", "sede", serverData).subscribe({
            next: (response: any) => {
            this.tools.submittedDisplay(response,this.display$)
            this.isSubmitted = false;
            },
            error: (error: any) => { 
            this.dialog.open(DialogAlertComponent, {
                data: {title: "Error", message: error.error}
            });
            this.isSubmitted = false;
            }
        });
        this.subscriptions.add(s);
        } 
    }



    protected submitSede() {
        var s = this.dd._post("persist", "sede", this.controlSede.value).subscribe({
        next: (response: any) => {
            this.tools.submittedDisplay(response,this.display$)
            this.isSubmitted = false;
        },
        error: (error: any) => { 
            this.dialog.open(DialogAlertComponent, {
            data: {title: "Error", message: error.error}
            });
            this.isSubmitted = false;
        }
        });
        this.subscriptions.add(s);
    }

    protected submitDomicilio() {
        var s = this.dd._post("persist", "domicilio", this.controlDomicilio.value).subscribe({
        next: (response: any) => {
            this.tools.submitted(response)
            this.controlSede.get("domicilio")?.setValue(response["id"])
            this.isSubmitted = false;
        },
        error: (error: any) => { 
            this.dialog.open(DialogAlertComponent, {
            data: {title: "Error", message: error.error}
            });
            this.isSubmitted = false;
        }
        });
        this.subscriptions.add(s);
    }
    
    ngOnDestroy () { this.subscriptions.unsubscribe() }


    

}
