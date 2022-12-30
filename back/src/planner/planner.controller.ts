import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Req,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { PlannerService } from './planner.service';
import { AuthGuard } from '@nestjs/passport';
import { PlannerIdDto } from './dto/planner-param.dto';
import { PlannerDateDto } from './dto/planner-date.dto';

@Controller('planner')
@ApiTags('플래너 API')
@ApiBearerAuth('access-token')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Post()
  @ApiOperation({
    summary: '계획 생성 API',
    description: 'description, date를 입력하여 계획을 생성',
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Req() request: Request, @Body() createPlannerDto: CreatePlannerDto) {
    const userId = request.user['userId'];
    return this.plannerService.createPlan(userId, createPlannerDto);
  }

  @Get()
  @ApiOperation({
    summary: '날짜별 일정 API',
    description:
      'query에 yyyy-yy-dd 형식으로 날짜를 넣으면 해당하는 계획을 모두 불러옴',
  })
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() request: Request, @Query('date') date: Date) {
    const userId = request.user['userId'];
    return this.plannerService.findAllByDate(userId, date);
  }

  @Get(':id')
  @ApiOperation({
    summary: '단일 일정 API',
    description: 'plan의 id를 param으로 해당 일정을 불러옴',
  })
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param() plannerIdDto: PlannerIdDto) {
    return this.plannerService.findOne(plannerIdDto);
  }

  @Get('check/month')
  @ApiOperation({
    summary: '일정 유무 확인 API',
    description:
      'query로 year, month를 넣으면 해당 달의 일정이 있었던 날을 알려줌',
  })
  @UseGuards(AuthGuard('jwt'))
  checkIfThereIsPlanOrNot(
    @Req() request: Request,
    @Query() plannerDateDto: PlannerDateDto,
  ) {
    const userId = request.user['userId'];
    return this.plannerService.checkIfThereIsPlanOrNot(userId, plannerDateDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: '계획 수정 API',
    description:
      'param으로 plan id를 받아 계획을 수정, 3가지 모두 넣을 필요 없음',
  })
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param() plannerIdDto: PlannerIdDto,
    @Body() updateUserDto: UpdatePlannerDto,
  ) {
    return this.plannerService.updatePlan(plannerIdDto, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '계획 삭제 API',
    description: 'param으로 plan id를 받아 계획을 삭제',
  })
  @UseGuards(AuthGuard('jwt'))
  delete(@Param() plannerIdDto: PlannerIdDto) {
    return this.plannerService.deletePlan(plannerIdDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '계획 완료상태 수정 API',
    description: '계획 완료 상태를 수정해줌',
  })
  @UseGuards(AuthGuard('jwt'))
  changCompletionStatus(@Param() plannerIdDto: PlannerIdDto) {
    return this.plannerService.changeCompletionStatus(plannerIdDto);
  }

  @Patch(':id/priority')
  @ApiOperation({
    summary: '우선순위 수정 API',
    description: 'plan id를 param으로 우선순위를 Body에 받아 우선순위 수정',
  })
  @UseGuards(AuthGuard('jwt'))
  changPriority(
    @Param() plannerIdDto: PlannerIdDto,
    @Query('priority') priority: number,
  ) {
    return this.plannerService.changePriority(plannerIdDto, priority);
  }
}
