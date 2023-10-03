import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './boards-status.enum';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService: BoardsService) {}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardsService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.boardsService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus (
		@Param('id', ParseIntPipe) id: number,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus
	) {
		return this.boardsService.updateBoardStatus(id, status);
	}
}
