import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {

  cards = [
      {
        "id":1,"concept":"OOPs",
        "description":"Object-oriented programming is a programming paradigm based on the concept of objects",
        "field":"General",
        "active":true
      },
      {
        "id":2,"concept":"Abstraction",
        "description":"Abstraction refers to the concept of hiding the complexities of a system from the users of that system",
        "field":"General",
        "active":true
      },
  ]

  constructor() { }


}
