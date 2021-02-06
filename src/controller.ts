import * as interfaces from './interfaces'
import { Model } from './model'
import { View } from './view'

export class Controller implements interfaces.Controller {
    private Model!: Model;
    View!: View;
    private _enteredValuesOfTask: interfaces.EnteredValuesOfTask;
    private _enteredValuesOfSchedule: interfaces.EnteredValuesOfSchedule;
    private _taskGroup: interfaces.EnteredValuesOfTask[];
    private _repeatTaskGroup: interfaces.EnteredValuesOfTask[];
    private _sheduleGroup: interfaces.EnteredValuesOfSchedule[];
    constructor() {
        this.Model = new Model();
        this.View = new View(this, this.Model);

    }
    //modelへの操作
    _getDateTimeArray = () => {
        let _date = new Date();
        return [_date.getFullYear() + '-' + ('00' + _date.getMonth() + 1).slice(-2) + '-' + ('00' + _date.getDate()).slice(-2),
        ('00' + _date.getHours()).slice(-2) + ':' + ('00' + _date.getMinutes()).slice(-2)];
    }
        

    //クリックイベント
    taskClickEvent = () => {
        console.log("clickedTaskForm");
        if (!((document.getElementById("taskName") as HTMLInputElement).value &&
            (document.getElementById("taskDetails") as HTMLInputElement).value)) {
            return;
        }
        this._enteredValuesOfTask = {
            taskName: (document.getElementById("taskName") as HTMLInputElement).value,
            taskDetails: (document.getElementById("taskDetails") as HTMLInputElement).value,
            important: (document.getElementById("taskImportant") as HTMLInputElement).checked,
            repeat: (document.getElementById("taskRepeat") as HTMLInputElement).checked,
        }
        console.log(this._enteredValuesOfTask);
        this.Model.setTaskGroup(this._enteredValuesOfTask);
        this.View.rendering();
        return false;
    }

    repeatTaskClickEvent = () => {
        //repeatTaskの配列をtaskへ移動
        this.Model.setTaskGroup(this.Model.getRepeatTaskGroup());
        this.Model.setRepeatTaskGroup([]);
        this.View.rendering();
    }

    scheduleClickEvent = () => {
        console.log("clickedScheduleForm");
        if (!((document.getElementById("scheduleName") as HTMLInputElement).value &&
            (document.getElementById("scheduleDetails") as HTMLInputElement).value)) {
            return;
        }
        this._enteredValuesOfSchedule = {
            scheduleName: (document.getElementById("scheduleName") as HTMLInputElement).value,
            scheduleDetails: (document.getElementById("scheduleDetails") as HTMLInputElement).value,
            yyyymmdd: (document.getElementById("scheduleDate") as HTMLInputElement).value,
            hhmm: (document.getElementById("scheduleTime") as HTMLInputElement).value,
        }
        console.log(this._enteredValuesOfSchedule);
        this.Model.setScheduleGroup(this._enteredValuesOfSchedule);
        this.View.rendering();
        return false;
    }

    delClickEvent = (_localstorageKey: string, _index?: number) => {
        //_indexの要素を削除しlocalstorageへ
        // this.Model.setTaskGroup(this.Model.getTaskGroup().splice(1, _index));の場合取り出された値が入ってしまう
        // alert("clickedDelEvent" + _index + JSON.stringify(this.Model.getTaskGroup()));
        if (_localstorageKey === 'task' && _index !== null) {
            this._taskGroup = this.Model.getTaskGroup();
            this._taskGroup.splice(_index, 1);
            this.Model.setTaskGroup(this._taskGroup);
            this.View.rendering();
            return;
        } else if (_localstorageKey === 'task' && _index === null) {
            this.Model.setTaskGroup([]);
            this.View.rendering();
        }
        if (_localstorageKey === 'repeatTask' && _index !== null) {
            this._repeatTaskGroup = this.Model.getRepeatTaskGroup();
            this._repeatTaskGroup.splice(_index, 1);
            this.Model.setRepeatTaskGroup(this._repeatTaskGroup);
            this.View.rendering();
            return;
        } else if (_localstorageKey === 'repeatTask' && _index === null) {
            this.Model.setRepeatTaskGroup([]);
            this.View.rendering();
        }
    }

    doneClickEvent = () => {
        //alert("clickedDoneEvent");
        this._taskGroup = this.Model.getTaskGroup();
        if (this._taskGroup[0].repeat) {
            this.Model.setRepeatTaskGroup(this._taskGroup[0]);
        }
        //shift()による破壊
        this._taskGroup.shift();
        this.Model.setTaskGroup(this._taskGroup);
        this.View.rendering();
    }

    passClickEvent = () => {
        // alert("clickedPassEvent");
        this._taskGroup = this.Model.getTaskGroup();
        //0番目を末尾へ
        this._taskGroup.push(this._taskGroup.shift());
        this.Model.setTaskGroup(this._taskGroup);
        this.View.rendering();
    }
}