
import BIT from './bit';

const BYTE_LENGTH = 8;
export default class BitArray {
    private byteArray: Uint8Array;

    constructor(bitLength: number) {
        const bitArray = new ArrayBuffer(bitLength / BYTE_LENGTH);
        this.byteArray = new Uint8Array(bitArray);
    }

    getAt(position: number): BIT {
        let bitAt = position - 1;
        let offset = Math.floor(bitAt / BYTE_LENGTH);
        let index = bitAt % BYTE_LENGTH;

        let bit: BIT = (this.byteArray[offset] >> index) & 1
        return bit;
    }

    setAt(position:number, value: BIT) {
        let bitAt = position - 1;
        let offset = Math.floor(bitAt / BYTE_LENGTH);
        let index = bitAt % BYTE_LENGTH;

        if (value === BIT.ON) {
            this.byteArray[offset] |= (BIT.ON << index);
        } else {
            this.byteArray[offset] &= (~ (BIT.ON << index));
        }
    }

    getLength() {
        return this.byteArray.byteLength * BYTE_LENGTH;
    }
}