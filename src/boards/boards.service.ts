import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards-status.enum';

@Injectable()
export class BoardsService {
	constructor (
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
	){}

	async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}

	async getBoardById(id: number): Promise <Board> {
		const found = await this.boardRepository.findOneBy({id});

		if (!found) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
		
		return found;
	}
}
