import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { CommentsService } from "../services/comments.service";
import { commentsActions } from "./actions";
import { CommentInterface } from "../types/comment.interface";

export const getCommentsEffect = createEffect(
  (
    actions$ = inject(Actions),
    commentsService = inject(CommentsService),
  ) => {
    return actions$.pipe(
      ofType(commentsActions.getComments),

      switchMap(({slug}) => {
        return commentsService.getComments(slug).pipe(
          map((comments:CommentInterface[]) => {
            return commentsActions.getCommentsSuccess({ comments });
          }),

          catchError(() => {
            return of(commentsActions.getCommentsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const createCommentEffect = createEffect(
  (
    actions$ = inject(Actions),
    commentsService = inject(CommentsService),
  ) => {
    return actions$.pipe(
      ofType(commentsActions.createComment),

      switchMap(({slug,commentRequest}) => {
        return commentsService.createComment(slug,commentRequest).pipe(
          map((comment:CommentInterface) => {
            return commentsActions.createCommentSuccess({ comment });
          }),

          catchError((errorResponse:HttpErrorResponse) => {
            return of(commentsActions.createCommentFailure({errors:errorResponse.error.errors}));
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteCommentEffect = createEffect(
  (
    actions$ = inject(Actions),
    commentsService = inject(CommentsService),
  ) => {
    return actions$.pipe(
      ofType(commentsActions.deleteComment),

      // mergeMap: deleting a second comment must not cancel the first delete request
      mergeMap(({slug,id}) => {
        return commentsService.deleteComment(slug,id).pipe(
          map(() => {
            return commentsActions.deleteCommentSuccess({ id });
          }),

          catchError(() => {
            return of(commentsActions.deleteCommentFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
