import { customAlphabet } from 'nanoid';
import { nolookalikesSafe } from 'nanoid-dictionary';

const nanoid = customAlphabet(nolookalikesSafe, 16);

export async function genNanoId() {
	return await nanoid();
}
