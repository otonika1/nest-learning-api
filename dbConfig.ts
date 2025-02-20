import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig:PostgresConnectionOptions = {
    url:'postgresql://realEstatedb_owner:JGeI6zcnwM2L@ep-solitary-hall-a5d77rd9.us-east-2.aws.neon.tech/realEstatedb?sslmode=require',
    type:'postgres',
    port:3306,
    entities:[__dirname+ '/**/*.entity{.ts,.js}'],
    synchronize:true,
}