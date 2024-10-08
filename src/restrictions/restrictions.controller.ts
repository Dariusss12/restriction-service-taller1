import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { CreateRestrictionDto } from './dto/create-restriction.dto';

@Controller('restrictions-service')
export class RestrictionsController {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  @Post(':studentId/add')
  create(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body() createRestrictionDto: CreateRestrictionDto
  ) {
    return this.restrictionsService.addRestriction(createRestrictionDto, studentId);
  }

  @Get(':studentId')
  findAll(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.restrictionsService.findAllRestrictions(studentId);
  }

  @Get(':studentId/check-restrictions')
  check(@Param('studentId') studentId: string) {
    return this.restrictionsService.checkRestrictions(studentId);
  }

  @Delete(':studentId/restrictions/:id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('studentId', ParseUUIDPipe) studentId: string
  ) {
    return this.restrictionsService.remove(id, studentId);
  }
}
