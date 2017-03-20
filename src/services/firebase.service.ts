import { AngularFire } from 'angularfire2';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import firebase from 'firebase';


@Injectable()
export class FirebaseService {
    db: any;

    constructor(private af: AngularFire) {
        this.db = firebase.database().ref();
    }

    logIn(telNum) {
        return new Promise((resolve, reject) => {
            const users = this.db.child('user');
            users.on('value', snap => {
                let _data = snap.toJSON();
                if (_data && (typeof _data[telNum] != 'undefined') && (_data[telNum].name != null)) {
                    resolve(true);
                } else {
                    console.log('+');
                    reject('User doesn\'t exist');
                }
            });
        });
    }
}