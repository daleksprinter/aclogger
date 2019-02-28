import React, {Component} from 'react';

import './aboutpage.css'

export default class AboutPage extends Component{
    render(){
        return(
            <div className = 'aboutpage'>
                <div>Version : beta 0.1</div>
                <br></br>
                <div>ACLoggerとは</div>
                    <div>&emsp;競技プログラミングのコンテストサイトやジャッジサイト等で問題を解くことで、草を生やすことができるツールです。</div>
                    <div>&emsp;競プロと草を生やすことが好きなみなさんのために作成されました。</div>
                    <div>&emsp;精進の記録や、モチベーション維持等にお役立てください。</div>
                    <div>&emsp;現状、AtCoder,Codeforces,AOJ,yukicoderに対応しています。</div>
                <br></br>
                <div>注意</div>
                    <div>&emsp;ACのカウントは重複した問題もカウントしています。(UniqueACの方が良いのだろうか...)</div>
                    <div>&emsp;yukicoderはコンテストタイトルの取得に対応していません。</div>
                    <div>Codeforcesや、AC数の多いAtCoderユーザを読み込むと速度が遅くなってしまいます。</div>
                <br></br>
                <div>今後の更新予定</div>
                    <div>&emsp;・ジャッジサイトの追加(APIが提供されていれば)</div>
                    <div>&emsp;・Daily AC, 合計ACのツイート（及び自動化）</div>
                    <div>&emsp;・ユーザーネームをcookieに保存</div>
                <br></br>
                <div>作った人</div>
                    <div>&emsp;Twitter : @Gxupu50ILbqonRQ ←要望、バグ報告等はこちらにどうぞ。</div>

            </div>
        )
    }
}

