import {Injectable} from '@nestjs/common';
import {CreateGameDto} from './dto/create-game.dto';
import {UpdateGameDto} from './dto/update-game.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Game} from './entities/game.entity';
import {QueryPaginationDto, SearchGameDto} from './types';
import {ResponsePaginationAPI} from '../types';

@Injectable()
export class GamesService {
    constructor(
        @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    ) {
    }

    create(createGameDto: CreateGameDto) {
        return 'This action adds a new game';
    }

    findAll() {
        return `This action returns all games`;
    }

    async findById(id: string): Promise<Game> {
        return this.gameModel.findById(id);
    }

    async searchGame(
        query: SearchGameDto,
    ): Promise<ResponsePaginationAPI<Game[]>> {
        const {search, limit, page} = query;
        const skip = (page - 1) * limit;

        const regex = new RegExp(search, 'i');
        const where = {
            $or: [
                {title: {$regex: regex}},
                {description: {$regex: regex}},
                {dateRelease: {$regex: regex}},
                {platforms: {$regex: regex}},
                {categories: {$regex: regex}},
            ],
        };
        const games = await this.gameModel
            .find(where)
            .skip(skip)
            .limit(limit)
            .exec();
        const totalGames = await this.gameModel.find(where).countDocuments().exec();
        const totalPage = Math.ceil(totalGames / limit);

        return {
            error: null,
            data: games,
            pagination: {
                currentPage: page,
                total: totalGames,
                limit,
                isNextPage: totalPage > page,
                totalPage,
            },
        };
    }

    async findGamesWithPagination(
        query: QueryPaginationDto,
    ): Promise<ResponsePaginationAPI<Game[]>> {
        const {page, limit} = query;
        const skip = (page - 1) * limit;
        const games = await this.gameModel.find().skip(skip).limit(limit).exec();
        const totalGames = await this.gameModel.countDocuments().exec();

        return {
            error: null,
            data: games,
            pagination: {
                currentPage: page,
                total: totalGames,
                limit,
                isNextPage: true,
                totalPage: Math.ceil(totalGames / limit),
            },
        };
    }

    update(id: number, updateGameDto: UpdateGameDto) {
        return `This action updates a #${id} game`;
    }

    remove(id: number) {
        return `This action removes a #${id} game`;
    }
}
