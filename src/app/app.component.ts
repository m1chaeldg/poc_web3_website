import { Component, OnInit } from '@angular/core';
import Web3 from "web3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'poc_web3_website';
  account: string = '';
  web3: Web3 | undefined;

  ngOnInit(): void {
    // this.setupWeb3();
  }

  connect() {
    this.setupWeb3();
  }

  private async setupWeb3() {
    if ((window as any).ethereum) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();

        this.web3 = new Web3((window as any).ethereum);

        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0];

      } catch (error) {
        // User denied account access...
        console.error(error);
      }
    } else if ((window as any).web3) {
      this.web3 = new Web3((window as any).web3.currentProvider);
    } else {
      throw new Error("NO_WEB3");
    }
  }
}
