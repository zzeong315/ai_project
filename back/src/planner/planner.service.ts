import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { PlannerDateDto } from './dto/planner-date.dto';
import { PlannerIdDto } from './dto/planner-param.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { Planner } from './entities/planner.entity';

@Injectable()
export class PlannerService {
  constructor(
    @InjectRepository(Planner)
    private plannerRepository: Repository<Planner>,
  ) {}

  async createPlan(userId: string, createPlannerDto: CreatePlannerDto) {
    const planner = new Planner();
    const { description, date, imgUrl, priority } = createPlannerDto;

    planner.description = description;
    planner.date = date;
    planner.imgUrl = imgUrl === undefined ? null : imgUrl;
    planner.userId = userId;
    planner.priority = priority;
    await this.plannerRepository.save(planner);
  }

  // 현재는 연결된 api가 없어서 userId 생성을 못하니 이거 해결하고 풀기
  // async recommendPlan(createPlannerDto: CreatePlannerDto) {
  //   const planner = new Planner();
  //   const { description, date, imgUrl } =
  //     createPlannerDto;

  //   planner.description = description;
  //   planner.date = date;
  //   planner.imgUrl = imgUrl === undefined ? null : imgUrl;
  //   planner.isRecommended = 1;
  //   planner.userId = userId;
  //   planner.priority = 1;
  //   await this.plannerRepository.save(planner);
  // }

  async changeCompletionStatus(plannerIdDto: PlannerIdDto) {
    const { id } = plannerIdDto;
    const planner = await this.findOne({ id });
    const isCompleted = planner.isCompleted ? 0 : 1;
    await this.plannerRepository.save({ id, isCompleted });
  }

  async changePriority(plannerIdDto: PlannerIdDto, priority: number) {
    const { id } = plannerIdDto;
    await this.plannerRepository.save({ id, priority });
  }

  async updatePlan(
    plannerIdDto: PlannerIdDto,
    updateplannerDto: UpdatePlannerDto,
  ) {
    const { id } = plannerIdDto;
    const planner = await this.findOne({ id });
    const { description, date, imgUrl } = updateplannerDto;
    planner.description = description;
    planner.date = date;
    planner.imgUrl = imgUrl;
    await this.plannerRepository.save(planner);
  }

  async deletePlan(plannerIdDto: PlannerIdDto): Promise<void> {
    const { id } = plannerIdDto;
    await this.plannerRepository.delete({ id });
  }

  async checkIfThereIsPlanOrNot(
    userId: string,
    plannerDateDto: PlannerDateDto,
  ) {
    const { year, month } = plannerDateDto;
    const plans = await this.plannerRepository.find({
      where: {
        userId,
        date: Between(new Date(year, month - 1, 1), new Date(year, month, 1)),
        isRecommended: 0,
      },
    });
    const days = [];
    plans.forEach((element) =>
      days.push(parseInt(element.date.toString().split('-')[2])),
    );
    return [...new Set(days)];
  }

  findAllByDate(userId: string, date: Date): Promise<Planner[]> {
    return this.plannerRepository.find({
      where: { userId, date },
    });
  }

  findOne(plannerIdDto: PlannerIdDto): Promise<Planner> {
    const { id } = plannerIdDto;
    return this.plannerRepository.findOne({
      where: { id },
    });
  }
}
