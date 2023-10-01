import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService: BoardsService) {}

	@Get('/')
	getAllBoard(): Board[] {
		return this.boardsService.getAllBoards();
	}

	@Post()
	createBoard(
		@Body() createBoardDto: CreateBoardDto
	): Board {
		return this.boardsService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: string): Board{
		//param이 여러 개라면 @Param()으로 처리
		return this.boardsService.getBoardById(id);
	}
}
