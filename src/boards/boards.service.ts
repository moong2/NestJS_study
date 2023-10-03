import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
	constructor (
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
	){}

	async getBoardById(id: number): Promise <Board> {
		const found = await this.boardRepository.findOneBy({id});

		if (!found) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
		
		return found;
	}
}
