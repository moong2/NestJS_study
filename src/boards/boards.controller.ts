import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './boards-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
	constructor(private boardsService: BoardsService) {}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto,
	@GetUser() user: User): Promise<Board> {
		return this.boardsService.createBoard(createBoardDto, user);
	}

	@Get()
	getAllBoard(): Promise<Board[]> {
		return this.boardsService.getAllBoards();
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
