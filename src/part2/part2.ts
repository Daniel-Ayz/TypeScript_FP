import * as R from "ramda";
import {text} from "stream/consumers";
import {filter} from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countLetters: (text: string) => { [key: string]: number } = (text: string) => countLettersHelper(text);

const countLettersHelper : (text: string) => {[key: string]: number} = R.pipe(
    (text: string) => R.trim(text),
    (textTrimmed: string) => stringToArray(textTrimmed),
    (textAsArray: string[]) => R.without([' '], textAsArray),
    (textAsArray: string[]) => R.countBy(R.toLower, textAsArray)
);

/* Question 2 */
export const isPaired: (text: string) => boolean = (text) => isPairedHelper(text);

const parenthesisArray = ['(',')','[',']','{','}'];

const isPairedHelper : (text: string) => boolean = R.pipe(
    (text: string) => stringToArray(text),
    (array: string[]) => R.filter((symbol: string) => parenthesisArray.includes(symbol))(array),
    (array) => R.reduce( (counter: {type1: number, type2: number, type3: number, balanced: boolean}, symbol) => {
        symbol == '(' ? counter.type1++ :
            symbol == ')' ? counter.type1--:
                symbol == '[' ? counter.type2++:
                    symbol == ']' ? counter.type2--:
                        symbol == '{' ? counter.type3++:
                            counter.type3--;
        (counter.type1 < 0 || counter.type2 < 0 || counter.type3 < 0) && (counter.balanced = false);
        return counter;
    }, {type1: 0, type2: 0, type3: 0, balanced: true} )(array),
    (acc: {type1: number, type2: number, type3: number, balanced: boolean}) => acc.balanced && acc.type1 == 0 && acc.type2 == 0 && acc.type3 == 0
);


/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence : (wordTree: WordTree) => string = treeToSentenceHelper;

function treeToSentenceHelper(wordTree: WordTree): string{
    if(wordTree.children.length == 0)
        return wordTree.root;
    else{
        return wordTree.root + R.reduce((acc:string, child: WordTree) => acc + " " +  treeToSentenceHelper(child), "")(wordTree.children);
    }
}