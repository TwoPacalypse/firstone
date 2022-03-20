import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';  

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {

  email: string;
  password: string;
  returned: object = {login: "123", token: "1"};
  error: string;
  token:any;
  

  message:object;
  condition: boolean;
  subscription: Subscription;
  subscriptionif: Subscription;
  subscriptiontoken: Subscription;
  imglink: any;

  constructor(
    private  router:  Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private data: DataService) {}


     ngOnInit() {
       this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
       this.subscriptionif = this.data.currentMessage1.subscribe(condition => this.condition = condition)
       this.subscriptiontoken = this.data.currentMessage2.subscribe(token => this.token = token)
      //  this.data.changeBool(false);
     }
    
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    async register(form) {
      const body = {login: this.email, password: this.password};
      await this.http.post('http://studentapi.myknitu.ru/register/', body).subscribe(
        (data:any) => {
                this.data.changeMessage(data);
                this.data.changeBool(true);
                console.log(this.message);
                this.data.savetoken(data.token)
                this.router.navigate(['../home'], { relativeTo: this.route }
                );
                this.http.post('http://studentapi.myknitu.ru/getuser/', this.message).subscribe(
                      (data:any) => 
                      {
 
                        data.img = data.img.toString().replace('https', 'http');
                        this.data.changeMessage(data);
                        console.log(this.message);
                        this.data.changeBool(true);

                      },
                      error => 
                      {
                        console.log(error);
                        this.data.changeBool(false);
                      }
                      );
                },
        error => {
          console.log(error);
          this.data.changeBool(false);
        }
      );
      console.log(this.message)
  }
  back(){
    this.router.navigate(['../signin'], { relativeTo: this.route });
    this.data.changeBool(true);
  }

}
