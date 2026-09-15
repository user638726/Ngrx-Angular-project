import { inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { FeedService } from "../../feed/services/feed.service";
import { feedActions } from "../../feed/store/actions";
import { GetFeedResponseInterface } from "../../feed/types/getFeedResponse.interface";
import { PopularTagService } from "../services/popular-tag.service";
import { popularTagsActions } from "./actions";
import { PopularTagType } from "../../../types/popularTag.type";

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService),
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),

      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags:PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags });
          }),

          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
