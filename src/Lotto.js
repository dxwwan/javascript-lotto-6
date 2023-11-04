import { Random, Console } from "@woowacourse/mission-utils";

class Lotto {
  #drawNumbers;

  constructor(numbers) {
    this.#validateDraw(numbers);
    this.#drawNumbers = numbers;
    this.rank = 0;
  }

  getRandomNumbers() {
    const randomNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
    return randomNumbers;
  }

  getLottoNumbers(amount) {
    const lottoNumbers = [];
    for (let i = 0; i < amount; i++) {
      lottoNumbers.push(this.getRandomNumbers());
    }
    return lottoNumbers;
  }

  printLottoNumbers(lottoNumbers) {
    for (let i = 0; i < lottoNumbers.length; i++) {
      Console.print(lottoNumbers[i]);
    }
  }

  async enterDrawNumbers() {
    const input = await Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
    const number = input.split(",");
    return this.#validateDraw(number).map(Number);
  }

  async enterBonusNumber() {
    const input = await Console.readLineAsync("\n보너스 번호를 입력해 주세요.\n");
    const number = input.split("");
    return this.#valudateBonus(number).map(Number);
  }

  #validateDraw(numbers) {
    if (!numbers) {
      return;
    }
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    return numbers;
  }

  #valudateBonus(bonus) {
    if (!bonus) {
      return;
    }
    if (bonus.length !== 1) {
      throw new Error("[ERROR] 보너스 번호는 1개여야 합니다.");
    }
    return bonus;
  }

  resultOfLotto(random, drew, bonus) {
    let result = this.matchCountCheck(random, drew);
    let isBonus = this.matchBonusCheck(random, bonus);
    if (result === 3) {
      return (this.rank = 5);
    }
    if (result === 4) {
      return (this.rank = 4);
    }
    if (result === 5) {
      return (this.rank = 3);
    }
    if (result === 5 && isBonus === true) {
      return (this.rank = 2);
    }
    if (result === 6) {
      return (this.rank = 1);
    }
    return (this.rank = 0);
  }

  matchCountCheck = (random, drew) => {
    let count = 0;
    const setLottoNumbers = [].concat(...new Set(random.flat()));
    for (let i = 0; i < setLottoNumbers.length; i++) {
      if (drew.includes(setLottoNumbers[i])) {
        count++;
      }
    }
    return count;
  };

  matchBonusCheck = (random, bonus) => {
    if (random.includes(bonus)) {
      return true;
    }
    return false;
  };
}
export default Lotto;
