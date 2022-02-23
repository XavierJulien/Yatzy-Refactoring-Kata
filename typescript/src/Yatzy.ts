export default class Yatzy {
  
  private dices: number[];

  constructor(...args : number[]) {
    this.dices = args;
  }

  /**
   * Static method to sum dices that correspond to n.
   * @param n  number to find
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  static sumByValues(n : number, dices : number[]): number {
    return dices.filter(v => v == n).reduce((p, c) => p + c, 0);
  }

  /**
   * Private method to sum dices that correspond to n (in a class environnement).
   * @param n  number to find
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  private sumByValue(n : number, dices : number[]): number {
    return dices.filter(v => v == n).reduce((p, c) => p + c, 0);
  }

  /**
   * The player scores the sum of the dice that reads one.
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  static ones(...dices: number[]): number {
    return this.sumByValues(1, dices);
  }

  /**
   * The player scores the sum of the dice that reads two.
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  static twos(...dices: number[]): number {
    return this.sumByValues(2, dices);
  }

  /**
   * The player scores the sum of the dice that reads three.
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  static threes(...dices: number[]): number {
    return this.sumByValues(3, dices);
  }

  /**
   * The player scores the sum of the dice that reads four.
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  fours(): number {
    return this.sumByValue(4, this.dices);
  }

  /**
   * The player scores the sum of the dice that reads five.
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  fives(): number {
    return this.sumByValue(5, this.dices);
  }

  /**
   * The player scores the sum of the dice that reads six.
   * @param dices list of dices
   * @returns the sum of matching dices.
   */
  sixes(): number {
    return this.sumByValue(6, this.dices);
  }

  /**
   * The player scores the sum of all dice, no matter what they read.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static chance(...dices: number[]): number {
    return dices.reduce((p, c) => p + c);
  }

  /**
   * If all dice have the same number, the player scores 50 points.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static yatzy(...dices: number[]): number {
    return dices.every(v => v === dices[0]) ? 50 : 0;
  }

  /**
   * The player scores the sum of the two highest matching dice.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static score_pair(...dices: number[]): number {
    var sorted_array = dices.sort((a,b) => b - a);
    for(var i = 0 ; i < sorted_array.length - 1 ; i++){
      if(sorted_array[i] === sorted_array[i + 1]){
        return sorted_array[i] * 2;
      }
    }
    return 0;
  }

  /**
   * If there are two pairs of dice with the same number, the player scores the sum of these dice.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static two_pair(...dices: number[]): number {
    var sum = 0;
    sum += this.score_pair(...dices);
    var filtered_array = dices.filter(v => v !== sum / 2);
    sum += this.score_pair(...filtered_array);
    return sum;
  }
  
  /**
   * If there are three dice with the same number, the player scores the sum of these dice.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static three_of_a_kind(...dices: number[]): number {
    var sorted_array = dices.sort((a,b) => b - a);
    for(var i = 0 ; i < sorted_array.length - 2 ; i++){
      if((sorted_array[i] == sorted_array[i + 1]) &&
         (sorted_array[i + 1] == sorted_array[i + 2])){
        return sorted_array[i] + sorted_array[i + 1] + sorted_array[i + 2];
      }
    }
    return 0;
  }

  /**
   * If there are four dice with the same number, the player scores the sum of these dice.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static four_of_a_kind(...dices: number[]): number {
    var sorted_array = dices.sort((a,b) => b - a);
    for(var i = 0 ; i < sorted_array.length - 3 ; i++){
      if((sorted_array[i] == sorted_array[i + 1]) &&
         (sorted_array[i + 1] == sorted_array[i + 2]) &&
         (sorted_array[i + 2] == sorted_array[i + 3])){
        return sorted_array[i] + sorted_array[i + 1] 
             + sorted_array[i + 2] + sorted_array[i + 3];
      }
    }
    return 0;
  }

  /**
   * If the dice read "1,2,3,4,5" the player scores the sum of the dices.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static smallStraight(...dices: number[]): number {
    var sorted_array = dices.sort((a,b) => a - b);
    return sorted_array[0] == 1 && sorted_array[1] == 2 
    && sorted_array[2] == 3 && sorted_array[3] == 4 && sorted_array[4] == 5 ? 15 : 0;
  }

  /**
   * If the dice read "2,3,4,5,6" the player scores the sum of the dices.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static largeStraight(...dices: number[]): number {
    var sorted_array = dices.sort((a,b) => a - b);
    return sorted_array[0] == 2 && sorted_array[1] == 3 
    && sorted_array[2] == 4 && sorted_array[3] == 5 && sorted_array[4] == 6 ? 20 : 0;
  }

  /**
   * If the dice are two of a kind and three of a kind, the player scores the sum of all the dice.
   * @param dices dices
   * @returns the sum of matching dices.
   */
  static fullHouse(...dices: number[]): number {
    var sum = 0;
    sum += this.score_pair(...dices);
    var filtered_array = dices.filter(v => v !== sum / 2);
    sum += this.three_of_a_kind(...filtered_array);
    return sum;
  }
}
