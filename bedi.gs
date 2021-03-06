function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
'set lon -32 30'
'set lat 30 65'

*'set mpvals -2 19 47 59'
'set mpvals -2 19 43 54'

'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.00 11.0 0.00 8.0'
'set grads off'
'set grid off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

*******************************************************************
********************** Tijdsinformatie ****************************
tsize = subwrd(_tdef,2)
_t1 = 1       ;
_t2 = 45
tsize = _t2 - _t1 + 1
'set t '_t1' '_t2
'q dims'
times  = sublin(result,5)
_time1 = subwrd(times,6)  
_time2 = subwrd(times,8)
_tdim = _time1' '_time2
tincr = subwrd(_tdef,5)
_tdef = 'tdef 'tsize' linear '_time1' 'tincr
huh = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

********************************************************
* BOw echo derecho index                               *
********************************************************

* iteratie
**********
'maps = 82'
  i = 1
  while ( i<maps )
'set t ' i

* Colortable
************
'color.gs 0 20 0.2 -gxout shaded -kind (255,255,255)->(130,130,130)->(190,190,63)->(255,255,0)->(236,208,0)->(217,161,0)->(197,114,0)->(178,67,0)->(158,20,0)->(179,16,56)->(201,11,113)->(223,7,169)->(245,2,226)->(216,32,229)->(187,62,232)->(158,92,236)->(129,122,239)->(100,152,243)->(71,182,246)->(42,212,249)->(13,242,253)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Bow echo parameter, Stormmotion, Bow propagation & 500mb GPM'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

say '.Calculations'
* Declaration variables & calculations
**************************************
say '..U-compontents'

'define u1000=ugrdprs(lev=1000)'
'define u975=ugrdprs(lev=975)'
'define u950=ugrdprs(lev=950)'
'define u925=ugrdprs(lev=925)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'
'define u350=ugrdprs(lev=350)'

say '..V-compontents'
'define v1000=vgrdprs(lev=1000)'
'define v975=vgrdprs(lev=975)'
'define v950=vgrdprs(lev=950)'
'define v925=vgrdprs(lev=925)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'
'define v350=vgrdprs(lev=350)'

say '..DLS'
'define usheardls=u450-u1000'
'define vsheardls=v450-v1000'
'define sheardls=sqrt(usheardls*usheardls+vsheardls*vsheardls)'

say '...DLSangle'
'define shearangle=57.3*atan2(usheardls,vsheardls)+180'

say '..Meanwind 0-6km'
'define umean=(u1000+u975+u950+u925+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450)/14.0'
'define vmean=(v1000+v975+v950+v925+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450)/14.0'
'define meanwind=sqrt(umean*umean+vmean*vmean)'

say '...Meanwind 0-6km angle'
'define mwangle=57.3*atan2(umean,vmean)+180'

say '..Meanwind 4-8km'
'define umeanul = (u600+u550+u500+u450+u400+u350)/6'
'define vmeanul = (v600+v550+v500+v450+v400+v350)/6'
'define meanwindul=sqrt(umeanul*umeanul+vmeanul*vmeanul)'

say '..Anglediff Smotion-shear'
'define anglediff = abs(mwangle-shearangle)'

say '..LapseRate 2-8km'
'define t800 = tmpprs(lev=800)'
'define h800 = hgtprs(lev=800)'
'define t450 = tmpprs(lev=450)'
'define h450 = hgtprs(lev=450)'
'define lapse=(abs(t800 - t450) / (h450-h800))*1000'

say '..Bow Echo Parameter'
*'define bep=(cape180_0mb/1500)*(lapse/7)*(45/anglediff)*(meanwindul/20)*(meanwind/20)'
'define bep=((cape180_0mb*3)/1500)*(lapse/4)*(meanwindul/20)*(meanwind/16)'

'd bep'

'set gxout contour'
'set cint 1'
'set cmin 1'
'set cstyle 3'
'set ccolor 0'
'set clab masked'
'set clopts -1'
'd bep'

* visualisatie Stormmotion
**************************
'set rgb 250 0 0 0 40'
'set gxout stream'
'set cthick 7'
'set ccolor 250'
'set strmden 7'
'd umean;vmean'

* visualisatie bowdirection
***************************
'set gxout vector'
'set arrlab off'
'set rgb 250 255 255 255 100'
'set ccolor 250'
'd maskout(1.944*usheardls,bep-1);1.944*vsheardls'

* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 0 0 0 255'
'set lwid 13 3.0'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'd smth9(hgtprs(lev=500))'

* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <-- higher means increased potential & severity for/of BowEchos -->'

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 500mb geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 Vectors: Direction of Bow propagation'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 streamlines: Stormmotion'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (13km), run: 'huh

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\700mbThetae'i'.png x1024 y768'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


************************************************************* 
* END OF MAIN SCRIPT                                        *
************************************************************* 

function getctl(handle)
line = 1
found = 0
while (!found)
  info = sublin(_ctl,line)
  if (subwrd(info,1)=handle)
    _handle = info
    found = 1
  endif
  line = line + 1
endwhile
return _handle
