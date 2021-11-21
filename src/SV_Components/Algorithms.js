class a_star_node {
  constructor(coords, p, h) {
    this._pos = coords;
    this._path = p;
    this._h_val = h;
  }
  set pos(coords) {
    this._pos = coords;
  }
  get pos() {
    return this._pos;
  }

  set path(p) {
    this._path = p;
  }
  get path() {
    return this._path;
  }
  set h_val(val) {
    this._h_val = val;
  }
  get h_val() {
    return this._h_val;
  }
}

function Manhattan(current, destination) {
  return (
    Math.abs(current[0] - destination[0]) +
    Math.abs(current[1] - destination[1])
  );
}

export function A_STAR(src_, dest_, isBorder) {
  var mat = [];
  var animations = [];
  var sqr_index = 0;
  var src;
  var dest = [];
  for (var i = 0; i < 20; i++) {
    mat[i] = new Array(25);
    for (var j = 0; j < 25; j++) {
      var grid_val = "none";
      if (sqr_index === src_) {
        src = new a_star_node([i, j], [], 0);
        grid_val = "src";
      } else if (sqr_index === dest_) {
        grid_val = "dest";
        dest[0] = i;
        dest[1] = j;
      } else if (isBorder[sqr_index]) {
        grid_val = "border";
      }
      mat[i][j] = [sqr_index, grid_val];
      sqr_index++;
    }
  }
  var q = [];
  var moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];

  q.push(src);
  while (!(q.length === 0)) {
    var best = q[0].h_val;
    var position = 0;
    for (let x = 0; x < q.length; x++) {
      if (q[x].h_val < best) {
        best = q[x].h_val;
        position = x;
      }
    }
    q = swap(0, position, q);
    var curr = q[0];
    curr.path.push(mat[curr.pos[0]][curr.pos[1]][0]);
    q.shift();
    var curr_level = [];
    for (let j = 0; j < moves.length; j++) {
      var next_row = curr.pos[0] + moves[j][0];
      var next_col = curr.pos[1] + moves[j][1];
      if (next_row < 0 || next_row > 19 || next_col < 0 || next_col > 24)
        continue;
      else if (mat[next_row][next_col][1] === "border") continue;
      else if (mat[next_row][next_col][1] === "seen") continue;
      else if (mat[next_row][next_col][1] === "src") continue;
      else if (mat[next_row][next_col][1] === "dest") {
        animations.push(curr.path);
        return animations;
      }
      mat[next_row][next_col][1] = "seen";
      var child_g = curr.path.length + 1;
      var child_h_val = Manhattan([next_row, next_col], dest);
      var child_f = child_g + child_h_val;
      var new_node = new a_star_node(
        [next_row, next_col],
        Array.from(curr.path),
        child_f
      );

      q.push(new_node);
      curr_level.push(mat[next_row][next_col][0]);
    }
    animations.push(curr_level);
  }
  return animations;
}
function swap(first, second, arr) {
  var temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
  return arr;
}

export function BFS(src_, dest_, isBorder) {
  var mat = [];
  var src = [];
  var idx = 0;
  var animations = [];
  var moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  var q = [];
  for (var i = 0; i < 20; i++) {
    mat[i] = new Array(25);
    for (var j = 0; j < 25; j++) {
      var square;
      if (idx === src_) {
        src = [i, j, []];
        square = "src";
      } else if (idx === dest_) {
        square = "dest";
      } else if (isBorder[idx]) {
        square = "border";
      } else square = "empty";
      mat[i][j] = [square, idx];
      idx++;
    }
  }

  q.push(src);
  while (q.length !== 0) {
    var curr = q[0];
    var curr_pos = mat[curr[0]][curr[1]][1];
    curr[2].push(curr_pos);
    q.shift();
    var temp = [];
    for (var x = 0; x < moves.length; x++) {
      var next_row = curr[0] + moves[x][0];
      var next_col = curr[1] + moves[x][1];
      if (next_row < 0 || next_row > 19 || next_col < 0 || next_col > 24)
        continue;
      if (mat[next_row][next_col][0] === "border") continue;
      if (mat[next_row][next_col][0] === "visited") continue;
      if (mat[next_row][next_col][0] === "dest") {
        animations.push(curr[2]);
        return animations;
      }

      mat[next_row][next_col][0] = "visited"; //Visited

      if (next_row === src[0] && next_col === src[1]) continue; //Ignore source

      temp.push(mat[next_row][next_col][1]); //Add to list of explored

      let path_copy = Array.from(curr[2]); //Copy path

      q.push([next_row, next_col, path_copy]); //Push next node and
    }
    animations.push(temp);
  }
  return animations;
}
